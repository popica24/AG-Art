using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Order.Models;
using MediatR;

namespace AGART.Application.OrderModule.Queries.GetOrders
{
    public class GetOrdersQueryHandler(IUnitOfWork uow) : IRequestHandler<GetOrdersQuery, IEnumerable<Order>>
    {
        public async Task<IEnumerable<Order>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
        {
            var items = uow.Order.Get();

            return [.. items];
        }
    }
}