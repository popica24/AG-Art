using MediatR;

namespace AGART.Application.ProductModule.Commands.SetRecommanded;

public record SetRecommandedCommand() : IRequest<bool>;

