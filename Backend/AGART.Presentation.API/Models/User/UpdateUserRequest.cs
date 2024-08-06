using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AGART.Presentation.API.Models.User.UserComponents;

namespace AGART.Presentation.API.Models.User
{
    public record UpdateUserRequest(string FirstName, string LastName, string PhoneNumber, ShippingDetailsRequest ShippingDetails, BillingDetailsRequest BillingDetails);
}