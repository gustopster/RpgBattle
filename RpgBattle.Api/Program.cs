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
    options.Listen(System.Net.IPAddress.Parse("192.168.15.5"), 5087); // HTTP
    options.Listen(System.Net.IPAddress.Parse("192.168.15.5"), 7183, listenOptions => listenOptions.UseHttps()); // HTTPS
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

// Database seed
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<RpgBattleDbContext>();
    db.Database.Migrate();

    db.Skills.RemoveRange(db.Skills);
    db.Characters.RemoveRange(db.Characters);
    db.Users.RemoveRange(db.Users);
    db.SaveChanges();

    // Seed Characters
    var archer = new Character { Id = Guid.Parse("3412b864-e8b3-4890-acca-52c9bbf415ff"), Name = "Arqueiro", Class = "Arqueiro", MaxHp = 100, Attack = 20, Defense = 15 };
    var warrior = new Character { Id = Guid.Parse("77b2f089-d6ae-43ab-9fb3-ef9100a3e3a5"), Name = "Guerreiro", Class = "Guerreiro", MaxHp = 120, Attack = 18, Defense = 20 };
    var mage = new Character { Id = Guid.Parse("b440d08f-4334-4113-8a6f-d763bd45d528"), Name = "Mago", Class = "Mago", MaxHp = 80, Attack = 25, Defense = 10 };
    var healer = new Character { Id = Guid.Parse("fa9bea2a-30e2-45e1-9a77-ccda941f9fa7"), Name = "Curandeiro", Class = "Curandeiro", MaxHp = 90, Attack = 10, Defense = 12 };

    db.Characters.AddRange(archer, warrior, mage, healer);
    db.SaveChanges();

    // Seed Skills
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

    // Seed Users
    db.Users.AddRange(
        new User { Id = Guid.Parse("11111111-1111-1111-1111-111111111111"), Nickname = "PlayerOne" },
        new User { Id = Guid.Parse("22222222-2222-2222-2222-222222222222"), Nickname = "PlayerTwo" }
    );
    db.SaveChanges();
}

app.UseAuthorization();
app.MapControllers();
app.Run();
