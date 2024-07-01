using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Commands.Create;

public record CreateProductCommand(Product product) : IRequest<ErrorOr<Product>>;
