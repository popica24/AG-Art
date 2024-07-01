using AGART.Application.Common.DTO.Product;
using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Common.Errors;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Commands.GetLatestAdded;

public class GetLatestAddedQueryHandler(IUnitOfWork uow) : IRequestHandler<GetLatestAddedQuery, ErrorOr<IEnumerable<ProductSearchResultDTO>>>
{
    public async Task<ErrorOr<IEnumerable<ProductSearchResultDTO>>> Handle(GetLatestAddedQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var products = uow.Products.GetLatestAdded();

            if (products == null || products.Count() < 6)
            {
                await uow.Products.SetLatestAdded();

                return uow.Products.GetLatestAdded().ToList();
            }
            return products.ToList();
        }
        catch (Exception ex)
        {
            return Errors.General.Internal(ex.Message);
        }
    }
}