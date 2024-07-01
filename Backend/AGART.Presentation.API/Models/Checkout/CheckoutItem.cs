namespace AGART.Presentation.API.Models.Checkout;

public record CheckoutItem(int id, string imagePath, string name, decimal price, int quantity, string variant);
