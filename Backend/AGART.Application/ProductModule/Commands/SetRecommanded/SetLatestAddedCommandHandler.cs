
using AGART.Application.Common.Interfaces.Persistance;
using MediatR;

namespace AGART.Application.ProductModule.Commands.SetRecommanded;

public class SetRecommandedCommandHandler(IUnitOfWork uow) : IRequestHandler<SetRecommandedCommand, bool>
{
    public async Task<bool> Handle(SetRecommandedCommand request, CancellationToken cancellationToken)
    {
        await uow.Products.SetRecommanded();
        return true;
    }
}
