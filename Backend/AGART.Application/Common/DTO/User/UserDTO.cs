namespace AGART.Application.Common.DTO.User;

public class UserDTO
{
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public string Customer { get; set; }
    public ShippingAddress ShippingDetails { get; set; }
    public BillingAddress BillingDetails { get; set; }

    public UserDTO(string email, string firstName, string lastName, string phoneNumber, string customer, ShippingAddress shippingDetails, BillingAddress billingDetails)
    {
        Email = email;
        FirstName = firstName;
        LastName = lastName;
        PhoneNumber = phoneNumber;
        Customer = customer;
        ShippingDetails = shippingDetails;
        BillingDetails = billingDetails;
    }
}