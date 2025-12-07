using RpgBattle.Application.DTOs;

namespace RpgBattle.Application.Services.Interfaces
{
    public interface IBattleService
    {
        Task<BattleDto> CreateBattleAsync(CreateBattleDto dto);
        Task<BattleDto?> JoinBattleAsync(Guid battleId, Guid userId, string nickname, Guid characterId);
        Task<BattleDto?> GetBattleAsync(Guid battleId);
        Task<IEnumerable<BattleDto>> GetAllBattlesAsync();
        Task<BattleDto?> AttackAsync(Guid battleId, AttackDto attackDto);
        Task<IEnumerable<BattleDto>> GetActiveBattlesAsync();
    }
}
