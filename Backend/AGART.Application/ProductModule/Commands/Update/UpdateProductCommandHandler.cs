using AGART.Application.Common.Interfaces.Persistance;
using AGART.Domain.Common.Errors;
using ErrorOr;
using MediatR;
using Stripe;

namespace AGART.Application.ProductModule.Commands.Update;

public class UpdateProductCommandHandler(IUnitOfWork uow) : IRequestHandler<UpdateProductCommand, ErrorOr<Domain.Product.Models.Product>>
{
    public async Task<ErrorOr<Domain.Product.Models.Product>> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        try
        {

            var result = await uow.Products.UpdateAsync(request.id, request.Params);

            await uow.SaveChangesAsync(cancellationToken);

            return result;

        }
        catch (Exception ex)
        {
            return Errors.General.Internal(ex.Message);
        }
    }

    // private static async Task UpdateStripeProductPrice(string stripeId, long Price)
    // {
    //     var productService = new ProductService();

    //     var priceService = new PriceService();

    //     var product = await productService.GetAsync(stripeId);

    //     var priceCreateOptions = new PriceCreateOptions
    //     {
    //         Product = product.Id,
    //         Currency = "ron",
    //         UnitAmount = Price * 100,
    //     };

    //     var newPrice = priceService.Create(priceCreateOptions);

    //     var productUpdateOptions = new ProductUpdateOptions
    //     {
    //         DefaultPrice = newPrice.Id
    //     };

    //     productService.Update(stripeId, productUpdateOptions);

    //     var x = product;
    // }
}
