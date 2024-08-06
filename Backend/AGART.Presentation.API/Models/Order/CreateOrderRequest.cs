namespace AGART.Presentation.API.Models.Order;
public record CreateOrderRequest(int id, string? name, string? imagePath, int price, int quantity, string variant);
