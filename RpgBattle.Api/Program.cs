using Microsoft.EntityFrameworkCore;
using RpgBattle.CrossCutting.Extensions;
using RpgBattle.CrossCutting.BackgroundServices;
using RpgBattle.Data.Context;
using RpgBattle.Api.Validators;
using FluentValidation;
using FluentValidation.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// 🔹 Configura Kestrel para IPv4 (localhost) e HTTPS
builder.WebHost.ConfigureKestrel(options =>
{
    // Escuta IP da rede local
    options.Listen(System.Net.IPAddress.Parse("192.168.15.8"), 5087); // HTTP
    options.Listen(System.Net.IPAddress.Parse("192.168.15.8"), 7183, listenOptions => listenOptions.UseHttps()); // HTTPS

    // Escuta localhost
    options.Listen(System.Net.IPAddress.Loopback, 5087); // HTTP localhost
    options.Listen(System.Net.IPAddress.Loopback, 7183, listenOptions =>
    {
        listenOptions.UseHttps(); // HTTPS localhost
    });
});


// 🔹 Controllers e validação
builder.Services.AddControllers();
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddFluentValidationClientsideAdapters();
builder.Services.AddValidatorsFromAssemblyContaining<CreateUserDtoValidator>();

// 🔹 Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// 🔹 Background
builder.Services.AddHostedService<MatchmakingService>();

// 🔹 Serviços do projeto
builder.Services
    .AddRpgBattlePersistence(builder.Configuration)
    .AddRpgBattleServices()
    .AddRpgBattleBackground();

// 🔹 CORS (dev)
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// 🔹 Middleware
app.UseCors(); // Antes de MapControllers
app.UseAuthorization();

// 🔹 Swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "RpgBattle.Api v1");
    });
}

// 🔹 Aplica migrations automaticamente
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<RpgBattleDbContext>();
    db.Database.Migrate();
}

// 🔹 Map Controllers
app.MapControllers();

app.Run();
