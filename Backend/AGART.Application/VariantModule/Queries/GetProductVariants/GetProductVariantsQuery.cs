using AGART.Application.Common.DTO.Variant;
using ErrorOr;
using MediatR;

namespace AGART.Application.VariantModule.Queries.GetProductVariants;

public record GetProductVariantsQuery(int productId) : IRequest<ErrorOr<IEnumerable<VariantSearchResultDTO>>>;