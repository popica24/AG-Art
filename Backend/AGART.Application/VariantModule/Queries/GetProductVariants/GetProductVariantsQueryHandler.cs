using AGART.Application.Common.DTO.Variant;
using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.VariantModule.Queries.GetProductVariants;

public class GetProductVariantsQueryHandler(IUnitOfWork uow) : IRequestHandler<GetProductVariantsQuery, ErrorOr<IEnumerable<VariantSearchResultDTO>>>
{
    public async Task<ErrorOr<IEnumerable<VariantSearchResultDTO>>> Handle(GetProductVariantsQuery request, CancellationToken cancellationToken)
    {
        var variants = uow.Variant.GetForProduct(request.productId);
        return variants.Select(v => new VariantSearchResultDTO(v)).ToList();
    }
}
