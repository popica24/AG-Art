using AGART.Domain.OrderProduct.Models;
using MediatR;

namespace AGART.Application.OrderProductModule.Commands;

public record AddOrderProductCommand(OrderProduct orderProduct) : IRequest<bool>;
