namespace RpgBattle.Application.DTOs
{
    public class BattleDto
    {
        public int Id { get; set; }
        public int Player1Id { get; set; }
        public string? Player1Nickname { get; set; } // Retorna o nome do usuário se disponível
        public int? Player2Id { get; set; }
        public string? Player2Nickname { get; set; } // Retorna o nome do usuário se disponível
        public int Player1Hp { get; set; }
        public int Player2Hp { get; set; }
        public string Status { get; set; } = null!;
        public int TurnUserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? TurnStartedAt { get; set; }
        public DateTime? ExpiresAt { get; set; }
    }
}
