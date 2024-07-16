namespace AGART.Presentation.API.Models.Order;
public record CreateOrderRequest(int id, string imagePath, string name, int price, int quantity, string variant);
