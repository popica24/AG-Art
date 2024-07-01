using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Commands.Create;

public class CreateProductCommandHandler(IUnitOfWork uow) : IRequestHandler<CreateProductCommand, ErrorOr<Product>>
{
    public async Task<ErrorOr<Product>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        uow.Products.AddAsync(request.product);

        await uow.SaveChangesAsync(cancellationToken);

        return request.product;
    }
}
