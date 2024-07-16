using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AGART.Domain.Order.Models;
using MediatR;

namespace AGART.Application.OrderModule.Queries.GetOrders;

public record GetOrdersQuery : IRequest<IEnumerable<Order>>;

