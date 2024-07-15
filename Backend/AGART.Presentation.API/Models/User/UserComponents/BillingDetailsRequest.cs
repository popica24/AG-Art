namespace AGART.Presentation.API.Models.User.UserComponents;

public record BillingDetailsRequest(string Street, string ZipCode, string City, string CountryCode, string State);
