

using AGART.Application.Common.DTO.Product;
using AGART.Application.Common.Interfaces.Persistance;
using AGART.Application.Common.Utilities;
using AGART.Domain.Product.Models;
using AGART.Services.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace AGART.Services.Persistance.Repositories;

public class ProductRepository(AppDbContext context, ICacheRepository cacheRepository) : GenericRepository<Product>(context), IProductRepository
{
    public override IQueryable<Product> Get()
    {
        return context.Product.Include(v => v.Variants).AsNoTracking();
    }

    public override async Task<Product> Get(int id)
    {
        var product = context.Product
                    .Include(v => v.Variants)
                    .AsNoTracking()
                    .FirstOrDefault(e => e.Id == id);
        if (product != null)
        {
            product.Variants = [.. product.Variants.OrderBy(v => v.Name)];
        }
        return product;
    }


    public IEnumerable<Product> Filter(Func<Product, bool> filter)
    {
        var items = context.Product.Include(p => p.Variants).AsNoTracking().Where(filter);

        return items;
    }

    public async Task<bool> SetLatestAdded()
    {
        var dummy = context.Product.ToList();
        var latestAdded = await context.Product
        .Include(p => p.Variants)
        .OrderByDescending(p => p.Id)
        .Take(5)
        .Where(p => p.CategoryId != 4)
        .Select(p => new ProductSearchResultDTO(p))
        .ToListAsync();

        var expiryTime = DateTimeOffset.UtcNow.AddDays(7);
        cacheRepository.SetData(GlobalConstants.RedisKeys.Latest, latestAdded, expiryTime);
        return true;
    }

    public IEnumerable<ProductSearchResultDTO> GetLatestAdded()
    {
        var latestAdded = cacheRepository.GetData<IEnumerable<ProductSearchResultDTO>>(GlobalConstants.RedisKeys.Latest);

        return latestAdded;
    }

    public async Task<bool> SetRecommanded()
    {
        var recommended = await context.Product
       .Include(p => p.Variants)
       .OrderBy(r => Guid.NewGuid())
       .Take(5)
       .Where(p => p.CategoryId != 4)
       .Select(p => new ProductSearchResultDTO(p))
       .ToListAsync();

        var expiryTime = DateTimeOffset.UtcNow.AddDays(7);
        cacheRepository.SetData(GlobalConstants.RedisKeys.Recommanded, recommended, expiryTime);
        return true;
    }

    public IEnumerable<ProductSearchResultDTO> GetRecommended()
    {
        var recommended = cacheRepository.GetData<IEnumerable<ProductSearchResultDTO>>(GlobalConstants.RedisKeys.Recommanded);

        return recommended;
    }
}
