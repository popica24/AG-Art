namespace AGART.Presentation.API.Models.Product;
public class ProductUpdateParams
{
    public string? Name { get; set; }

    public int? CategoryId { get; set; }

    public string? Description { get; set; }

    public string? Material { get; set; }

    public string? Dimensions { get; set; }

    public string? LightSource { get; set; }

    public long? Price { get; set; }

    public string[]? VariantNames { get; set; }

    public string? ColorCode { get; set; }

    public string[]? Keywords { get; set; }

    public int? PercentOff { get; set; }

    public bool Visible { get; set; }
}
