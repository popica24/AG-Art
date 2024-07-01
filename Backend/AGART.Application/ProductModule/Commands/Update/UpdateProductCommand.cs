using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Commands.Update;

public record UpdateProductCommand(int id, Product Params) : IRequest<ErrorOr<Product>>;


