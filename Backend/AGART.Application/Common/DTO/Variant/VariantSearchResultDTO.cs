namespace AGART.Application.Common.DTO.Variant;

public class VariantSearchResultDTO
{
    public string Name { get; set; }
    public string ColorCode { get; set; }

    public VariantSearchResultDTO()
    {

    }

    public VariantSearchResultDTO(Domain.Product.Models.Variant variant)
    {
        Name = variant.Name;
        ColorCode = variant.ColorCode;
    }
}
