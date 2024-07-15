using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows.Input;
using AGART.Domain.Order.Models;
using MediatR;

namespace AGART.Application.OrderModule.Commands.AddToDo
{
    public record AddToDoCommand(Order order) : IRequest<bool>;

}