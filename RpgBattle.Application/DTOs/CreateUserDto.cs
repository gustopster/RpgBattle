namespace RpgBattle.Application.DTOs
{
    public class CreateUserDto
    {
        public int Id { get; set; }
        public string Nickname { get; set; } = null!;
    }
}
