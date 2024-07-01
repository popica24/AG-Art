
namespace AGART.Application.Common.DTO.Product;

public class ProductSearchResultDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public long Price { get; set; }
    public int PercentOff { get; set; } = 0;
    public string[] ColorCodes { get; set; }

    public ProductSearchResultDTO()
    {

    }

    public ProductSearchResultDTO(Domain.Product.Models.Product product)
    {
        Id = product.Id;
        Name = product.Name;
        Price = product.Price;
        PercentOff = product.PercentOff;
        ColorCodes = product.Variants.Select(v => v.ColorCode).ToArray();
    }
}
