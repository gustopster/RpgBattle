using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RpgBattle.Data.Context;
using RpgBattle.Domain.Models;

namespace RpgBattle.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly RpgBattleDbContext _context;

        public UsersController(RpgBattleDbContext context)
        {
            _context = context;
        }

        // GET api/users/login?nickname=PlayerOne
        [HttpGet("login")]
        public async Task<IActionResult> Login([FromQuery] string nickname)
        {
            if (string.IsNullOrWhiteSpace(nickname))
                return BadRequest("Nickname é obrigatório");

            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Nickname.ToLower() == nickname.ToLower());

            if (user == null)
                return NotFound("Usuário não encontrado");

            return Ok(user);
        }

        // GET api/users
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var users = await _context.Users.ToListAsync();
            return Ok(users);
        }
    }
}
