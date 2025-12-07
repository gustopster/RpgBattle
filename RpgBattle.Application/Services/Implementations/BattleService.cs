using AutoMapper;
using RpgBattle.Application.DTOs;
using RpgBattle.Application.Services.Interfaces;
using RpgBattle.Data.Repositories.Interfaces;
using RpgBattle.Domain.Models;

namespace RpgBattle.Application.Services.Implementations
{
    public class BattleService : IBattleService
    {
        private readonly IRepository<Battle> _battleRepo;
        private readonly IRepository<Character> _charRepo;
        private readonly IRepository<Skill> _skillRepo;
        private readonly IRepository<User> _userRepo;
        private readonly IMapper _mapper;
        private readonly Random _rng;

        public BattleService(
            IRepository<Battle> battleRepo,
            IRepository<Character> charRepo,
            IRepository<Skill> skillRepo,
            IRepository<User> userRepo,
            IMapper mapper)
        {
            _battleRepo = battleRepo;
            _charRepo = charRepo;
            _skillRepo = skillRepo;
            _userRepo = userRepo;
            _mapper = mapper;
            _rng = new Random();
        }

        public async Task<BattleDto> CreateBattleAsync(CreateBattleDto dto)
        {
            var user = await _userRepo.GetByIdAsync(dto.UserId);
            if (user == null)
                throw new ArgumentException("Usuário não encontrado.");

            if (!string.Equals(user.Nickname, dto.Nickname, StringComparison.OrdinalIgnoreCase))
                throw new ArgumentException("O Nickname informado não corresponde ao usuário.");

            var character = await _charRepo.GetByIdAsync(dto.CharacterId)
                ?? throw new ArgumentException("Personagem não encontrado");

            var battle = new Battle
            {
                Id = Guid.NewGuid(),
                Player1Id = dto.UserId,
                Player1CharacterId = dto.CharacterId,
                Player1Hp = character.MaxHp,
                Player2Hp = 0,
                Status = "waiting",
                TurnUserId = dto.UserId,
                CreatedAt = DateTime.UtcNow,
                TurnStartedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddMinutes(3)
            };

            await _battleRepo.AddAsync(battle);
            await _battleRepo.SaveChangesAsync();

            return _mapper.Map<BattleDto>(battle);
        }

        public async Task<BattleDto?> JoinBattleAsync(Guid battleId, Guid userId, string nickname, Guid characterId)
        {
            var battle = await _battleRepo.GetByIdAsync(battleId);
            if (battle == null) throw new ArgumentException("Batalha não encontrada.");
            if (battle.Status != "waiting") throw new InvalidOperationException("Batalha já está ativa ou finalizada.");

            var user = await _userRepo.GetByIdAsync(userId);
            if (user == null) throw new ArgumentException("Usuário não encontrado.");
            if (!string.Equals(user.Nickname, nickname, StringComparison.OrdinalIgnoreCase))
                throw new ArgumentException("O Nickname informado não corresponde ao usuário.");

            var existingBattle = (await _battleRepo.GetAllAsync())
                .FirstOrDefault(b => b.Status == "active" && (b.Player1Id == userId || b.Player2Id == userId));

            if (existingBattle != null) throw new InvalidOperationException("Usuário já está em uma batalha ativa.");

            var character = await _charRepo.GetByIdAsync(characterId)
                ?? throw new ArgumentException("Personagem não encontrado.");

            if (battle.Player1CharacterId == characterId)
                throw new InvalidOperationException("O personagem já está sendo usado pelo outro jogador.");

            battle.Player2Id = userId;
            battle.Player2CharacterId = characterId;
            battle.Player2Hp = character.MaxHp;
            battle.Status = "active";
            battle.TurnStartedAt = DateTime.UtcNow;
            battle.ExpiresAt = DateTime.UtcNow.AddMinutes(3);

            _battleRepo.Update(battle);
            await _battleRepo.SaveChangesAsync();

            return _mapper.Map<BattleDto>(battle);
        }


        public async Task<BattleDto?> GetBattleAsync(Guid battleId)
        {
            var battle = await _battleRepo.GetByIdAsync(battleId);
            return battle == null ? null : _mapper.Map<BattleDto>(battle);
        }
        public async Task<IEnumerable<BattleDto>> GetAllBattlesAsync()
        {
            var battles = await _battleRepo.GetAllAsync();
            return battles.Select(_mapper.Map<BattleDto>);
        }

        public async Task<BattleDto?> AttackAsync(Guid battleId, AttackDto attackDto)
        {
            var battle = await _battleRepo.GetByIdAsync(battleId);
            if (battle == null || battle.Status != "active") return null;
            if (battle.TurnUserId != attackDto.AttackerUserId) return null;

            var skill = await _skillRepo.GetByIdAsync(attackDto.SkillId) ?? throw new ArgumentException("Skill not found");

            bool attackerIsPlayer1 = battle.Player1Id == attackDto.AttackerUserId;

            int roll = RollD6();
            bool hit = roll <= skill.HitChance;

            if (hit)
            {
                int damage = skill.Damage;
                if (attackerIsPlayer1)
                    battle.Player2Hp = Math.Max(0, battle.Player2Hp - damage);
                else
                    battle.Player1Hp = Math.Max(0, battle.Player1Hp - damage);
            }

            if (battle.Player1Hp == 0 || battle.Player2Hp == 0)
            {
                battle.Status = "finished";
                battle.FinishedAt = DateTime.UtcNow;
            }
            else
            {
                if (battle.Player2Id != null)
                    battle.TurnUserId = attackerIsPlayer1 ? battle.Player2Id!.Value : battle.Player1Id;
            }

            battle.TurnStartedAt = DateTime.UtcNow;
            battle.ExpiresAt = DateTime.UtcNow.AddMinutes(3);

            _battleRepo.Update(battle);
            await _battleRepo.SaveChangesAsync();

            return _mapper.Map<BattleDto>(battle);
        }

        public async Task<IEnumerable<BattleDto>> GetActiveBattlesAsync()
        {
            var all = await _battleRepo.GetAllAsync();
            return all.Where(b => b.Status == "active").Select(b => _mapper.Map<BattleDto>(b));
        }

        private int RollD6() => _rng.Next(1, 7);
    }
}
