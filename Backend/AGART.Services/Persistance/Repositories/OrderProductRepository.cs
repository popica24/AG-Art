using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.OrderProduct.Models;
using AGART.Services.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace AGART.Services.Persistance.Repositories;

public class OrderProductRepository(AppDbContext context) : GenericRepository<OrderProduct>(context), IOrderProduct
{
    public IList<IGrouping<int, OrderProduct>> Get(string userId)
    {
        var fullOrders = context.OrderProduct.Include(op => op.Product).Include(op => op.Order).AsNoTracking().Where(op => op.ClientId == userId).GroupBy(o => o.OrderId).ToList();

        return fullOrders;
    }
}
