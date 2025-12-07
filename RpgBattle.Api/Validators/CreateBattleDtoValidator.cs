using FluentValidation;
using RpgBattle.Application.DTOs;

namespace RpgBattle.Api.Validators
{
    public class CreateBattleDtoValidator : AbstractValidator<CreateBattleDto>
    {
        public CreateBattleDtoValidator()
        {
            RuleFor(x => x.UserId)
                .NotEmpty().WithMessage("UserId não pode ser vazio.");

            RuleFor(x => x.Nickname)
                .NotEmpty().WithMessage("Nickname não pode ser vazio.");

            RuleFor(x => x.CharacterId)
                .NotEmpty().WithMessage("CharacterId não pode ser vazio.");
        }
    }
}
