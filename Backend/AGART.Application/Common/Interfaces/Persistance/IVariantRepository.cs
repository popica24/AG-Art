using AGART.Domain.Product.Models;

namespace AGART.Application.Common.Interfaces.Persistance
{
    public interface IVariantRepository : IGenericRepository<Variant>
    {
        IEnumerable<Variant> GetForProduct(int productId);
        IEnumerable<Variant> Filter(Func<Variant, bool> filter);
    }
}