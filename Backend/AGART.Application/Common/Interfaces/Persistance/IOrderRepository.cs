using AGART.Domain.Order.Models;

namespace AGART.Application.Common.Interfaces.Persistance
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        IEnumerable<Order> Filter(Func<Order, bool> filter);

    }
}