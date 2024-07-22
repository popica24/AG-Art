using AGART.Domain.Order.Models;
using MediatR;

namespace AGART.Application.OrderModule.Commands.AddToDo
{
    public record AddToDoCommand(Order order) : IRequest<bool>;

}