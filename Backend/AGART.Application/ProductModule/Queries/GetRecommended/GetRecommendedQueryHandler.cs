using AGART.Application.Common.DTO.Product;
using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Common.Errors;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Queries.GetRecommended;

public class GetRecommendedQueryHandler(IUnitOfWork uow) : IRequestHandler<GetRecommendedQuery, ErrorOr<IEnumerable<ProductSearchResultDTO>>>
{
    public async Task<ErrorOr<IEnumerable<ProductSearchResultDTO>>> Handle(GetRecommendedQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var products = uow.Products.GetRecommended();

            if (products == null || products.Count() < 6)
            {
                await uow.Products.SetRecommanded();

                return uow.Products.GetRecommended().ToList();
            }
            return products.ToList();
        }
        catch (Exception ex)
        {
            return Errors.General.Internal(ex.Message);
        }
    }
}
