namespace RpgBattle.Domain.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Nickname { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
