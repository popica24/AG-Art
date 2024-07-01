using AGART.Application.Common.DTO.Product;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Queries.GetRecommended;

public record GetRecommendedQuery() : IRequest<ErrorOr<IEnumerable<ProductSearchResultDTO>>>;

