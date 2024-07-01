using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.VariantModule.Queries.GetVariant;

public class GetVariantQueryHandler(IUnitOfWork uow) : IRequestHandler<GetVariantQuery, ErrorOr<Variant>>
{
    public async Task<ErrorOr<Variant>> Handle(GetVariantQuery request, CancellationToken cancellationToken)
    {
        var item = uow.Variant.Filter(x => x.ProductId == request.ProductId && x.Id == request.VariantId).First();

        return item;
    }
}
