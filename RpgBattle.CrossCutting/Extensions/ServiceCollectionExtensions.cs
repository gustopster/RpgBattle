using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using RpgBattle.Application.Mappings;
using RpgBattle.Application.Services.Implementations;
using RpgBattle.Application.Services.Interfaces;
using RpgBattle.CrossCutting.Background;
using RpgBattle.Data.Context;
using RpgBattle.Data.Repositories.Implementations;
using RpgBattle.Data.Repositories.Interfaces;

namespace RpgBattle.CrossCutting.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRpgBattlePersistence(this IServiceCollection services, IConfiguration config)
        {
            var conn = config.GetConnectionString("Default");
            services.AddDbContext<RpgBattleDbContext>(options =>
                options.UseNpgsql(conn));

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            return services;
        }

        public static IServiceCollection AddRpgBattleServices(this IServiceCollection services)
        {
            services.AddScoped<IBattleService, BattleService>();
            services.AddAutoMapper(typeof(BattleProfile));
            return services;
        }

        public static IServiceCollection AddRpgBattleBackground(this IServiceCollection services)
        {
            services.AddHostedService<BattleCleanupService>();
            return services;
        }
    }
}
