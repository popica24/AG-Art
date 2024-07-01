using AGART.Domain.Common.Models;

namespace AGART.Application.Common.Interfaces.Persistance;

public interface IGenericRepository<TEntity> where TEntity : class
{
    public IQueryable<TEntity> Get();
    Task<TEntity> Get(int id);
    void AddAsync(TEntity entity);
    Task<TEntity> UpdateAsync(int id, TEntity entity);
    void DeleteAsync(int id);
    void Save();
}