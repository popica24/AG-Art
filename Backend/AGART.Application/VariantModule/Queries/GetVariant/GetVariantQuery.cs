using AGART.Domain.Product.Models;
using ErrorOr;
using MediatR;

namespace AGART.Application.VariantModule.Queries.GetVariant;

public record GetVariantQuery(int ProductId, int VariantId) : IRequest<ErrorOr<Variant>>;

