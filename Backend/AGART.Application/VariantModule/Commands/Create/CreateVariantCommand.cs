using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.VariantModule.Commands.Create;

public record CreateVariantCommand(Variant Variant) : IRequest<ErrorOr<Variant>>;
