using Microsoft.EntityFrameworkCore;
using RpgBattle.CrossCutting.Extensions;
using RpgBattle.Data.Context;
using RpgBattle.Domain.Models;
using FluentValidation.AspNetCore;
using RpgBattle.Api.Validators;
using FluentValidation;
using RpgBattle.CrossCutting.BackgroundServices;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Configura Kestrel para escutar todas as interfaces
builder.WebHost.ConfigureKestrel(options =>
{
    options.Listen(System.Net.IPAddress.Parse("192.168.15.6"), 5087); // HTTP
    options.Listen(System.Net.IPAddress.Parse("192.168.15.6"), 7183, listenOptions => listenOptions.UseHttps()); // HTTPS
});

// Controllers e validação
builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<CreateUserDtoValidator>();

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Background
builder.Services.AddHostedService<MatchmakingService>();

// Serviços do projeto
builder.Services
    .AddRpgBattlePersistence(builder.Configuration)
    .AddRpgBattleServices()
    .AddRpgBattleBackground();

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
            "http://localhost:5087",
            "http://192.168.15.5:5087",  // PC
            "http://192.168.15.2:5081"   // Celular
        )
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});

var app = builder.Build();

// CORS
app.UseCors();

// Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "RpgBattle.Api v1");
    });
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<RpgBattleDbContext>();
    db.Database.Migrate();

    // Seed Users
    if (!db.Users.Any())
    {
        db.Users.AddRange(
            new User { Id = 1, Nickname = "PlayerOne" },
            new User { Id = 2, Nickname = "PlayerTwo" }
        );
        db.SaveChanges();
    }

    // Seed Characters
    if (!db.Characters.Any())
    {
        var archer = new Character { Id = 1, Name = "Arqueiro", Class = "Arqueiro", MaxHp = 100, Attack = 20, Defense = 15 };
        var warrior = new Character { Id = 2, Name = "Guerreiro", Class = "Guerreiro", MaxHp = 120, Attack = 18, Defense = 20 };
        var mage = new Character { Id = 3, Name = "Mago", Class = "Mago", MaxHp = 80, Attack = 25, Defense = 10 };
        var healer = new Character { Id = 4, Name = "Curandeiro", Class = "Curandeiro", MaxHp = 90, Attack = 10, Defense = 12 };

        db.Characters.AddRange(archer, warrior, mage, healer);
        db.SaveChanges();

        // Seed Skills
        db.Skills.AddRange(
            new Skill { Id = 1, CharacterId = archer.Id, Name = "Tiro Rápido", Damage = 15, HitChance = 4 },
            new Skill { Id = 2, CharacterId = archer.Id, Name = "Esquiva", Damage = 0, HitChance = 3 },
            new Skill { Id = 3, CharacterId = warrior.Id, Name = "Golpe Forte", Damage = 20, HitChance = 4 },
            new Skill { Id = 4, CharacterId = warrior.Id, Name = "Bloqueio", Damage = 0, HitChance = 3 },
            new Skill { Id = 5, CharacterId = mage.Id, Name = "Bola de Fogo", Damage = 25, HitChance = 4 },
            new Skill { Id = 6, CharacterId = mage.Id, Name = "Barreira Mágica", Damage = 0, HitChance = 3 },
            new Skill { Id = 7, CharacterId = healer.Id, Name = "Ataque Fraco", Damage = 10, HitChance = 4 },
            new Skill { Id = 8, CharacterId = healer.Id, Name = "Defesa Leve", Damage = 0, HitChance = 3 },
            new Skill { Id = 9, CharacterId = healer.Id, Name = "Cura Básica", Damage = -20, HitChance = 4 }
        );
        db.SaveChanges();
    }
}

app.UseAuthorization();
app.MapControllers();
app.Run();
