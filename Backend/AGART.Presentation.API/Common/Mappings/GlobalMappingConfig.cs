using AGART.Application.ProductModule.Commands.Create;
using AGART.Application.VariantModule.Commands.Create;
using AGART.Domain.Product.Models;
using AGART.Presentation.API.Models.Product;
using AGART.Presentation.API.Models.Variant;
using Mapster;

namespace AGART.Presentation.API.Common.Mappings;

public sealed class GlobalMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<CreateProductRequest, Product>()
        .Map(dest => dest.Name, src => src.Name)
        .Map(dest => dest.Visible, src => false)
        .Map(dest => dest.CategoryId, src => src.CategoryId)
        .Map(dest => dest.Material, src => src.Material)
        .Map(dest => dest.Description, src => src.Description)
        .Map(dest => dest.Dimensions, src => src.Width + " x " + src.Height + " x " + src.Length)
        .Map(dest => dest.LightSource, src => src.LightSource)
        .Map(dest => dest.Price, src => src.Price)
        .Map(dest => dest.Keywords, src => src.Keywords)
        .Map(dest => dest.StripeId, src => Guid.NewGuid().ToString());

        TypeAdapterConfig<CreateProductRequest, CreateProductCommand>
       .NewConfig()
       .Map(dest => dest.product, src => src.Adapt<Product>());

        config.NewConfig<ProductUpdateParams, Product>()
        .Map(dest => dest.Name, src => src.Name)
        .Map(dest => dest.CategoryId, src => src.CategoryId)
        .Map(dest => dest.Material, src => src.Material)
        .Map(dest => dest.Description, src => src.Description)
        .Map(dest => dest.Dimensions, src => src.Dimensions)
        .Map(dest => dest.LightSource, src => src.LightSource)
        .Map(dest => dest.Price, src => src.Price)
        .Map(dest => dest.Keywords, src => src.Keywords)
        .Map(dest => dest.PercentOff, src => src.PercentOff);

        config.NewConfig<CreateVariantRequest, Variant>()
        .Map(dest => dest.Name, src => src.Name)
        .Map(dest => dest.ColorCode, src => src.ColorCode)
        .Map(dest => dest.ProductId, src => src.ProductId);

        TypeAdapterConfig<CreateVariantRequest, CreateVariantCommand>
        .NewConfig()
        .Map(dest => dest.Variant, src => src.Adapt<Variant>());
    }
}
