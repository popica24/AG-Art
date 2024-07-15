using AGART.Application.Common.DTO.Order;
using AGART.Application.Common.Interfaces.Persistance;
using MediatR;

namespace AGART.Application.OrderModule.Queries.GetOrdersForUser;

public class GetOrderForUserQueryHandler(IUnitOfWork uow) : IRequestHandler<GetOrderForUserQuery, IEnumerable<OrderDTO>>
{
    public async Task<IEnumerable<OrderDTO>> Handle(GetOrderForUserQuery request, CancellationToken cancellationToken)
    {
        var items = uow.Order.Filter(order => order.UserId == request.uId);

        return items.Select(item => new OrderDTO(item)).ToList();
    }
}
