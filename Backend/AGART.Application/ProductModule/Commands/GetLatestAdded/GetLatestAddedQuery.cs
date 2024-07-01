using AGART.Application.Common.DTO.Product;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Commands.GetLatestAdded;

public class GetLatestAddedQuery : IRequest<ErrorOr<IEnumerable<ProductSearchResultDTO>>>;
