using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Product.Models;
using AGART.Services.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace AGART.Services.Persistance.Repositories
{
    public class VariantRepository(AppDbContext context) : GenericRepository<Variant>(context), IVariantRepository
    {
        public IEnumerable<Variant> GetForProduct(int productId)
        {
            var variants = context.Variant.Where(v => v.ProductId == productId).OrderBy(s => s.Name).ToList();

            return variants;
        }

        public IEnumerable<Variant> Filter(Func<Variant, bool> filter)
        {
            var items = context.Variant.AsNoTracking().Where(filter);
            return items;
        }
    }
}