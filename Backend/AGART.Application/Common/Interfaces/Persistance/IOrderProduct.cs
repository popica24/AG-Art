using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AGART.Domain.OrderProduct.Models;

namespace AGART.Application.Common.Interfaces.Persistance
{
    public interface IOrderProduct : IGenericRepository<OrderProduct>
    {
        IList<IGrouping<int, OrderProduct>> Get(string userId);
        IList<IGrouping<int, OrderProduct>> FullJoin();
    }
}