using AGART.Application.Common.Interfaces.Persistance;
using MediatR;

namespace AGART.Application.OrderProductModule.Commands;

public class AddOrderProductCommandHandler(IUnitOfWork uow) : IRequestHandler<AddOrderProductCommand, bool>
{
    public async Task<bool> Handle(AddOrderProductCommand request, CancellationToken cancellationToken)
    {
        try
        {
            uow.OrderProduct.AddAsync(request.orderProduct);

            await uow.SaveChangesAsync(cancellationToken);

            return true;
        }
        catch (Exception ex)
        {
            return false;
        }
    }
}
