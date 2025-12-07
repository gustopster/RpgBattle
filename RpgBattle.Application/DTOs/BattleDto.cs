namespace RpgBattle.Application.DTOs
{
    public class BattleDto
    {
        public Guid Id { get; set; }
        public Guid Player1Id { get; set; }
        public Guid? Player2Id { get; set; }
        public int Player1Hp { get; set; }
        public int Player2Hp { get; set; }
        public string Status { get; set; } = null!;
        public Guid TurnUserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? TurnStartedAt { get; set; }
        public DateTime? ExpiresAt { get; set; }
    }
}
