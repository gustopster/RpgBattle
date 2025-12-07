using Microsoft.EntityFrameworkCore;
using RpgBattle.Data.Context;
using RpgBattle.Data.Repositories.Interfaces;
using System.Linq.Expressions;

namespace RpgBattle.Data.Repositories.Implementations
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly RpgBattleDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public Repository(RpgBattleDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);
        public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();
        public async Task<T?> GetByIdAsync(Guid id) => await _dbSet.FindAsync(id);
        public void Remove(T entity) => _dbSet.Remove(entity);
        public void Update(T entity) => _dbSet.Update(entity);
        public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
        public async Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate) =>
            await _dbSet.FirstOrDefaultAsync(predicate);
        public async Task DeleteAsync(Guid id)
        {
            var entity = await GetByIdAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
            }
        }
    }
}
