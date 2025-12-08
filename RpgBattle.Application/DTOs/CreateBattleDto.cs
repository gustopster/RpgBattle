namespace RpgBattle.Application.DTOs
{
    public class CreateBattleDto
    {
        public int UserId { get; set; }
        public string Nickname { get; set; } = null!;
        public int CharacterId { get; set; }
    }
}
