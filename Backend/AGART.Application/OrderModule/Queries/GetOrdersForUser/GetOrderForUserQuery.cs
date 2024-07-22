using AGART.Application.Common.DTO.Order;
using AGART.Application.Common.DTO.Product;
using MediatR;

namespace AGART.Application.OrderModule.Queries.GetOrdersForUser;

public record GetOrderForUserQuery(string uId) : IRequest<IEnumerable<OrderDTO>>;
