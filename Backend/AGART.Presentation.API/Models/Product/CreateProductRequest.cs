namespace AGART.Presentation.API.Models.Product;

public record CreateProductRequest(
string Name,
int CategoryId,
string? Material,
string Description,
decimal Height,
decimal Width,
decimal Length,
decimal Weight,
string? LightSource,
long Price,
string[] Keywords
);
