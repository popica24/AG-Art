using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Common.Errors;
using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Queries.GetProducts;

public class GetProductsQueryHandler(IUnitOfWork uow) : IRequestHandler<GetProductsQuery, ErrorOr<IEnumerable<Product>>>
{
    public async Task<ErrorOr<IEnumerable<Product>>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            return uow.Products.Get().ToList();
        }
        catch (Exception ex)
        {
            return Errors.General.Internal(ex.Message);
        }
    }
}
