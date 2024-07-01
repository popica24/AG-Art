namespace AGART.Domain.Product;

public class ProductQueryParameters
{
    public int? CategoryId { get; set; }
    public string? Material { get; set; }
    public string? LightSource { get; set; }
    public bool? Discounted { get; set; }
    public string? Keywords { get; set; }
}
