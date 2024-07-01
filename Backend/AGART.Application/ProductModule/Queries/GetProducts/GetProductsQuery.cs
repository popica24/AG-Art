using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Queries.GetProducts;
public record GetProductsQuery : IRequest<ErrorOr<IEnumerable<Product>>>;
