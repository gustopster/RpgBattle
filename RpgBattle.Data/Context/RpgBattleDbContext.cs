using Microsoft.EntityFrameworkCore;
using RpgBattle.Domain.Models;

namespace RpgBattle.Data.Context
{
    public class RpgBattleDbContext : DbContext
    {
        public RpgBattleDbContext(DbContextOptions<RpgBattleDbContext> options) : base(options) { }

        public DbSet<User> Users => Set<User>();
        public DbSet<Character> Characters => Set<Character>();
        public DbSet<Skill> Skills => Set<Skill>();
        public DbSet<Battle> Battles => Set<Battle>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("projeto");

            modelBuilder.Entity<Skill>()
                .HasOne(s => s.Character)
                .WithMany(c => c.Skills)
                .HasForeignKey(s => s.CharacterId);

            modelBuilder.Entity<Battle>()
                .HasIndex(b => b.Status);
        }

    }
}
