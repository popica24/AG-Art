using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Common.Errors;
using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.VariantModule.Commands.Create;

public class CreateVariantCommandHandler(IUnitOfWork uow) : IRequestHandler<CreateVariantCommand, ErrorOr<Variant>>
{
    public async Task<ErrorOr<Variant>> Handle(CreateVariantCommand request, CancellationToken cancellationToken)
    {
        try
        {
            uow.Variant.AddAsync(request.Variant);

            await uow.SaveChangesAsync(cancellationToken);

            return request.Variant;
        }
        catch (Exception ex)
        {
            return Errors.General.Internal(ex.Message);
        }
    }
}
