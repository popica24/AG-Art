using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Queries.GetProduct;

public record GetProductQuery(int id) : IRequest<ErrorOr<Product>>;
