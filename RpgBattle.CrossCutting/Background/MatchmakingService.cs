using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RpgBattle.Data.Repositories.Interfaces;
using RpgBattle.Domain.Models;

namespace RpgBattle.CrossCutting.BackgroundServices
{
    public class MatchmakingService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;
        private readonly TimeSpan _checkInterval = TimeSpan.FromSeconds(5);
        private readonly TimeSpan _waitTime = TimeSpan.FromSeconds(30);
        private static readonly Random _rng = new();

        public MatchmakingService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _scopeFactory.CreateScope();
                var battleRepo = scope.ServiceProvider.GetRequiredService<IRepository<Battle>>();
                var charRepo = scope.ServiceProvider.GetRequiredService<IRepository<Character>>();

                var now = DateTime.UtcNow;

                var waitingBattles = (await battleRepo.GetAllAsync())
                    .Where(b => b.Status == "waiting"
                        && b.Player2Id == null
                        && (now - b.CreatedAt) >= _waitTime)
                    .OrderBy(b => b.CreatedAt)
                    .ToList();

                while (waitingBattles.Count >= 2)
                {
                    var b1 = waitingBattles[0];
                    var b2 = waitingBattles[1];

                    var char1 = await charRepo.GetByIdAsync(b1.Player1CharacterId);
                    var char2 = await charRepo.GetByIdAsync(b2.Player1CharacterId);

                    if (char1 == null || char2 == null)
                    {
                        waitingBattles.RemoveRange(0, 2);
                        continue;
                    }

                    b1.Player2Id = b2.Player1Id;
                    b1.Player2CharacterId = b2.Player1CharacterId;
                    b1.Player1Hp = char1.MaxHp;
                    b1.Player2Hp = char2.MaxHp;
                    b1.Status = "active";
                    b1.TurnStartedAt = now;
                    b1.ExpiresAt = now.AddMinutes(3);

                    b1.TurnUserId = _rng.Next(0, 2) == 0
                        ? b1.Player1Id
                        : b1.Player2Id!.Value;

                    await battleRepo.DeleteAsync(b2.Id);

                    waitingBattles.RemoveRange(0, 2);

                    battleRepo.Update(b1);
                    await battleRepo.SaveChangesAsync();
                }

                await Task.Delay(_checkInterval, stoppingToken);
            }
        }
    }
}
