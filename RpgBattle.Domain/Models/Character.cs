namespace RpgBattle.Domain.Models
{
    public class Character
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string Class { get; set; } = null!;
        public int MaxHp { get; set; }
        public int Attack { get; set; }
        public int Defense { get; set; }

        public ICollection<Skill> Skills { get; set; } = new List<Skill>();
    }
}
