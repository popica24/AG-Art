using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Order.Models;
using AGART.Domain.Product.Models;
using AGART.Services.Persistance.Context;
using Microsoft.EntityFrameworkCore;

namespace AGART.Services.Persistance.Repositories
{
    public class OrderRepository(AppDbContext context) : GenericRepository<Order>(context), IOrderRepository
    {
        public IEnumerable<Order> Filter(Func<Order, bool> filter)
        {
            var items = context.Order.Include(o => o.OrderProducts).AsNoTracking().Where(filter);

            return items;
        }
    }
}