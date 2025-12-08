namespace RpgBattle.Domain.Models
{
    public class Battle
    {
        public int Id { get; set; }

        public int Player1Id { get; set; }
        public int? Player2Id { get; set; }

        public int Player1CharacterId { get; set; }
        public int? Player2CharacterId { get; set; }

        public int Player1Hp { get; set; }
        public int Player2Hp { get; set; }

        public int TurnUserId { get; set; }

        public string Status { get; set; } = "waiting";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? FinishedAt { get; set; }
        public DateTime? TurnStartedAt { get; set; }
        public DateTime? ExpiresAt { get; set; }

        public void FinishByTimeout()
        {
            Status = "finished";
            FinishedAt = DateTime.UtcNow;
        }
    }
}
