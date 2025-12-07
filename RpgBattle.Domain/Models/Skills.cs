namespace RpgBattle.Domain.Models
{
    public class Skill
    {
        public Guid Id { get; set; }
        public Guid CharacterId { get; set; }
        public string Name { get; set; } = null!;
        public int Damage { get; set; }
        public int HitChance { get; set; }
        public Character Character { get; set; } = null!;
    }
}
