namespace RpgBattle.Domain.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Nickname { get; set; } = null!;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
