using Microsoft.EntityFrameworkCore;
using RpgBattle.CrossCutting.Extensions;
using RpgBattle.Data.Context;
using RpgBattle.Domain.Models;
using FluentValidation.AspNetCore;
using RpgBattle.Api.Validators;
using FluentValidation;
using RpgBattle.CrossCutting.BackgroundServices;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<CreateUserDtoValidator>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHostedService<MatchmakingService>();

builder.Services
    .AddRpgBattlePersistence(builder.Configuration)
    .AddRpgBattleServices()
    .AddRpgBattleBackground();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<RpgBattleDbContext>();
    db.Database.Migrate();

    db.Skills.RemoveRange(db.Skills);
    db.Characters.RemoveRange(db.Characters);
    db.Users.RemoveRange(db.Users); 
    db.SaveChanges();

    var archer = new Character
    {
        Id = Guid.Parse("3412b864-e8b3-4890-acca-52c9bbf415ff"),
        Name = "Arqueiro",
        Class = "Arqueiro",
        MaxHp = 100,
        Attack = 20,
        Defense = 15
    };
    var warrior = new Character
    {
        Id = Guid.Parse("77b2f089-d6ae-43ab-9fb3-ef9100a3e3a5"),
        Name = "Guerreiro",
        Class = "Guerreiro",
        MaxHp = 120,
        Attack = 18,
        Defense = 20
    };
    var mage = new Character
    {
        Id = Guid.Parse("b440d08f-4334-4113-8a6f-d763bd45d528"),
        Name = "Mago",
        Class = "Mago",
        MaxHp = 80,
        Attack = 25,
        Defense = 10
    };
    var healer = new Character
    {
        Id = Guid.Parse("fa9bea2a-30e2-45e1-9a77-ccda941f9fa7"),
        Name = "Curandeiro",
        Class = "Curandeiro",
        MaxHp = 90,
        Attack = 10,
        Defense = 12
    };

    db.Characters.AddRange(archer, warrior, mage, healer);
    db.SaveChanges();

    db.Skills.AddRange(
        new Skill { Id = Guid.NewGuid(), CharacterId = archer.Id, Name = "Tiro Rápido", Damage = 15, HitChance = 4 },
        new Skill { Id = Guid.NewGuid(), CharacterId = archer.Id, Name = "Esquiva", Damage = 0, HitChance = 3 },
        new Skill { Id = Guid.NewGuid(), CharacterId = warrior.Id, Name = "Golpe Forte", Damage = 20, HitChance = 4 },
        new Skill { Id = Guid.NewGuid(), CharacterId = warrior.Id, Name = "Bloqueio", Damage = 0, HitChance = 3 },
        new Skill { Id = Guid.NewGuid(), CharacterId = mage.Id, Name = "Bola de Fogo", Damage = 25, HitChance = 4 },
        new Skill { Id = Guid.NewGuid(), CharacterId = mage.Id, Name = "Barreira Mágica", Damage = 0, HitChance = 3 },
        new Skill { Id = Guid.NewGuid(), CharacterId = healer.Id, Name = "Ataque Fraco", Damage = 10, HitChance = 4 },
        new Skill { Id = Guid.NewGuid(), CharacterId = healer.Id, Name = "Defesa Leve", Damage = 0, HitChance = 3 },
        new Skill { Id = Guid.NewGuid(), CharacterId = healer.Id, Name = "Cura Básica", Damage = -20, HitChance = 4 }
    );
    db.SaveChanges();

    var user1 = new User
    {
        Id = Guid.Parse("11111111-1111-1111-1111-111111111111"),
        Nickname = "PlayerOne"
    };
    var user2 = new User
    {
        Id = Guid.Parse("22222222-2222-2222-2222-222222222222"),
        Nickname = "PlayerTwo"
    };

    db.Users.AddRange(user1, user2);
    db.SaveChanges();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
