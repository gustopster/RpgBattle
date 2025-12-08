using System.Linq.Expressions;

namespace RpgBattle.Data.Repositories.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id);
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        void Update(T entity);
        void Remove(T entity);
        Task DeleteAsync(int id);
        Task SaveChangesAsync();
        Task<T?> FirstOrDefaultAsync(Expression<Func<T, bool>> predicate);
    }
}
