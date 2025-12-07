using AutoMapper;
using RpgBattle.Application.DTOs;
using RpgBattle.Domain.Models;

namespace RpgBattle.Application.Mappings
{
    public class BattleProfile : Profile
    {
        public BattleProfile()
        {
            CreateMap<Battle, BattleDto>();
            CreateMap<CreateBattleDto, Battle>();
        }
    }
}
