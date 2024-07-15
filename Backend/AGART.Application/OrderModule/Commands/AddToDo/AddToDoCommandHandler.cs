using AGART.Application.Common.Interfaces.Persistance;
using MapsterMapper;
using MediatR;

namespace AGART.Application.OrderModule.Commands.AddToDo
{
    public class AddToDoCommandHandler(IUnitOfWork uow, IMapper mapper) : IRequestHandler<AddToDoCommand, bool>
    {
        public async Task<bool> Handle(AddToDoCommand request, CancellationToken cancellationToken)
        {
            uow.Order.AddAsync(request.order);

            await uow.SaveChangesAsync(cancellationToken);
            return true;
        }
    }
}