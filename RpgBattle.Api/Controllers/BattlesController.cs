using Microsoft.AspNetCore.Mvc;
using RpgBattle.Application.DTOs;
using RpgBattle.Application.Services.Interfaces;

namespace RpgBattle.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BattlesController : ControllerBase
    {
        private readonly IBattleService _battleService;

        public BattlesController(IBattleService battleService)
        {
            _battleService = battleService;
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateBattleDto dto)
        {
            var battle = await _battleService.CreateBattleAsync(dto);
            return Ok(battle);
        }

        [HttpPost("{id}/join")]
        public async Task<IActionResult> Join(int id, [FromBody] JoinBattleDto dto)
        {
            var battle = await _battleService.JoinBattleAsync(id, dto.UserId, dto.Nickname, dto.CharacterId);
            if (battle == null) return BadRequest("Não foi possível entrar na batalha.");
            return Ok(battle);
        }

        [HttpPost("{id}/attack")]
        public async Task<IActionResult> Attack(int id, [FromBody] AttackDto dto)
        {
            var result = await _battleService.AttackAsync(id, dto);
            if (result == null) return BadRequest();
            return Ok(result);
        }

        [HttpGet()]
        public async Task<IActionResult> Get()
        {
            var battles = await _battleService.GetAllBattlesAsync();
            return Ok(battles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var b = await _battleService.GetBattleAsync(id);
            if (b == null) return NotFound();
            return Ok(b);
        }
    }
}
