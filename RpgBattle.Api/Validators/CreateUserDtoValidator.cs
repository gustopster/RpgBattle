using FluentValidation;
using RpgBattle.Application.DTOs;

namespace RpgBattle.Api.Validators
{
    public class CreateUserDtoValidator : AbstractValidator<CreateUserDto>
    {
        public CreateUserDtoValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Id não pode ser vazio.");

            RuleFor(x => x.Nickname)
                .NotEmpty().WithMessage("Nickname não pode ser vazio.");
        }
    }
}
