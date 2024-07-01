using AGART.Application.Common.DTO.Product;
using AGART.Domain.Product;
using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Queries.SearchProduct;
public record SearchProductQuery(ProductQueryParameters Parameters) : IRequest<ErrorOr<IEnumerable<ProductSearchResultDTO>>>;
