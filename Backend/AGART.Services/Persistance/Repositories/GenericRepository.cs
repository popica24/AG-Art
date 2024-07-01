using System.ComponentModel.DataAnnotations;
using System.Reflection;
using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Common.Models;
using AGART.Services.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace AGART.Services.Persistance.Repositories;

public class GenericRepository<TEntity>(AppDbContext context) : IGenericRepository<TEntity> where TEntity : class, IEntity
{
    public async void AddAsync(TEntity entity)
    {
        await context.Set<TEntity>().AddAsync(entity);

    }

    public void DeleteAsync(int id)
    {
        var product = context.Set<TEntity>().AsNoTracking().FirstOrDefault(p => p.Id == id);
        if (product != null)
            context.Set<TEntity>().Remove(product);
    }

    public virtual IQueryable<TEntity> Get() => context.Set<TEntity>().AsNoTracking();

    public virtual async Task<TEntity> Get(int id) => await context.Set<TEntity>()
                        .AsNoTracking()
                        .FirstOrDefaultAsync(e => e.Id == id);

    public void Save()
    {
        context.SaveChanges();
    }

    public async Task<TEntity> UpdateAsync(int id, TEntity entity)
    {
        var existingEntity = await context.Set<TEntity>().FindAsync(id);

        var entityType = typeof(TEntity);
        var properties = typeof(TEntity).GetProperties()
            .Where(p => p.GetCustomAttribute<KeyAttribute>() == null);

        foreach (var property in properties.Where(prop => prop.Name != "Price"))
        {
            var newValue = property.GetValue(entity);
            if (newValue != null)
            {
                property.SetValue(existingEntity, newValue);
            }
        }

        return existingEntity;
    }
}