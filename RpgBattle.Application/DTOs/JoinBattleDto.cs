namespace RpgBattle.Application.DTOs
{
    public class JoinBattleDto
    {
        public Guid UserId { get; set; }
        public string Nickname { get; set; } = null!;
        public Guid CharacterId { get; set; }
    }
}
