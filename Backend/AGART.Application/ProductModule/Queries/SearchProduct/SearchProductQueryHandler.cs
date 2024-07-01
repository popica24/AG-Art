using AGART.Application.Common.DTO.Product;
using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Common.Errors;
using ErrorOr;
using MediatR;

namespace AGART.Application.ProductModule.Queries.SearchProduct;

public class SearchProductQueryHandler(IUnitOfWork uow) : IRequestHandler<SearchProductQuery, ErrorOr<IEnumerable<ProductSearchResultDTO>>>
{
    public async Task<ErrorOr<IEnumerable<ProductSearchResultDTO>>> Handle(SearchProductQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var query = uow.Products.Get();

            if (request.Parameters.CategoryId.HasValue)
            {
                var categoryExists = await uow.Category.CategoryExists(request.Parameters.CategoryId.Value);

                if (!categoryExists)
                {
                    return Errors.Category.CategoryDoesNotExist();
                }

                query = query.Where(product => product.CategoryId == request.Parameters.CategoryId);
            }

            if (!string.IsNullOrEmpty(request.Parameters.Material))
            {
                query = query.Where(product => product.Material == request.Parameters.Material);
            }

            if (!string.IsNullOrEmpty(request.Parameters.LightSource))
            {
                query = query.Where(product => product.LightSource == request.Parameters.LightSource);
            }

            if (request.Parameters.Discounted.HasValue)
            {
                if (request.Parameters.Discounted.Value)
                {
                    query = query.Where(product => product.PercentOff > 0);
                }
                if (!request.Parameters.Discounted.Value)
                {
                    query = query.Where(product => product.PercentOff == 0);
                }
            }

            if (!string.IsNullOrEmpty(request.Parameters.Keywords))
            {
                var predicateList = request.Parameters.Keywords
                .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                .Select(p => p.Trim().ToLower())
                .ToList();

                query = query.Where(product => product.Keywords != null &&
                predicateList.All(p => product.Keywords
                .Select(k => k.Trim().ToLower())
                .Contains(p)));
            }
            var models = query.ToList();

            if (models.Count == 0)
            {
                return Errors.Product.NoResultsMatched();
            }

            return await Task.FromResult(models.Select(m => new ProductSearchResultDTO(m)).ToList());
        }
        catch (Exception ex)
        {
            return Errors.General.Internal(ex.Message);
        }
    }
}

