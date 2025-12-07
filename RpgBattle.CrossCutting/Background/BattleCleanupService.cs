using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using RpgBattle.Data.Context;

namespace RpgBattle.CrossCutting.Background
{
    public class BattleCleanupService : BackgroundService
    {
        private readonly IServiceProvider _provider;
        private readonly ILogger<BattleCleanupService> _logger;

        public BattleCleanupService(
            IServiceProvider provider,
            ILogger<BattleCleanupService> logger)
        {
            _provider = provider;
            _logger = logger;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using var scope = _provider.CreateScope();
                    var db = scope.ServiceProvider.GetRequiredService<RpgBattleDbContext>();

                    var now = DateTime.UtcNow;

                    var expiredBattles = await db.Battles
                        .Where(b => b.Status == "active" && b.ExpiresAt != null && b.ExpiresAt <= now)
                        .ToListAsync(stoppingToken);

                    foreach (var battle in expiredBattles)
                    {
                        battle.FinishByTimeout();
                    }

                    await db.SaveChangesAsync(stoppingToken);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error in BattleCleanupService");
                }

                await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
            }
        }
    }
}
