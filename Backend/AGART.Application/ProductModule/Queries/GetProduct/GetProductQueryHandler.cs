using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Common.Errors;
using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Queries.GetProduct;

public class GetProductQueryHandler(IUnitOfWork uow) : IRequestHandler<GetProductQuery, ErrorOr<Product>>
{
    public async Task<ErrorOr<Product>> Handle(GetProductQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var product = await uow.Products.Get(request.id);

            if (product is not null)
            {
                return product;
            }
            else
                return Errors.Product.ProductDoesNotExist();
        }
        catch (Exception ex)
        {
            return Errors.General.Internal(ex.Message);
        }
    }
}
