using AGART.Presentation.API.Models.User.UserComponents;

namespace AGART.Presentation.API.Models.User;

public record CreateUserRequest(string Email, string FirstName, string LastName, string PhoneNumber, ShippingDetailsRequest ShippingDetails, BillingDetailsRequest BillingDetails);

