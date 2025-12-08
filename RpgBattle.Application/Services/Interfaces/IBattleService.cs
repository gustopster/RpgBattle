using RpgBattle.Application.DTOs;

namespace RpgBattle.Application.Services.Interfaces
{
    public interface IBattleService
    {
        Task<BattleDto> CreateBattleAsync(CreateBattleDto dto);
        Task<BattleDto?> JoinBattleAsync(int battleId, int userId, string nickname, int characterId);
        Task<BattleDto?> GetBattleAsync(int battleId);
        Task<IEnumerable<BattleDto>> GetAllBattlesAsync();
        Task<BattleDto?> AttackAsync(int battleId, AttackDto attackDto);
        Task<IEnumerable<BattleDto>> GetActiveBattlesAsync();
    }
}
