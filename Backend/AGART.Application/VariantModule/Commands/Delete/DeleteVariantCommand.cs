
using ErrorOr;
using MediatR;

namespace AGART.Application.VariantModule.Commands.Delete;

public record DeleteVariantCommand(int id) : IRequest<ErrorOr<bool>>;


