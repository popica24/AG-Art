using AGART.Application.Common.DTO.Product;
using AGART.Domain.Product.Models;

namespace AGART.Application.Common.Interfaces.Persistance;

public interface IProductRepository : IGenericRepository<Product>
{
    IEnumerable<Product> Filter(Func<Product, bool> filter);
    Task<bool> SetLatestAdded();
    Task<bool> SetRecommanded();
    IEnumerable<ProductSearchResultDTO> GetLatestAdded();
    IEnumerable<ProductSearchResultDTO> GetRecommended();
}