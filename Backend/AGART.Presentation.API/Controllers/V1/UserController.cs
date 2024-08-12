using AGART.Presentation.API.Models.User;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using FirebaseAdmin.Auth;
using FirebaseAdmin;
using AGART.Application.Common.DTO.User;

namespace AGART.Presentation.API.Controllers.V1;

[ApiVersion(1)]
[ApiController]
[EnableCors("Admin")]
[Route("api/v{v:apiVersion}/[controller]")]
public class UserController : ControllerBase
{
    [HttpPost]
    [Authorize]
    [MapToApiVersion(1)]
    public async Task<IActionResult> Create(CreateUserRequest request)
    {
        try
        {
            var shippingAddress = new ShippingOptions
            {
                Name = request.FirstName.Trim() + " " + request.LastName.Trim(),
                Phone = request.PhoneNumber,
                Address = new AddressOptions
                {
                    City = request.ShippingDetails.City,
                    Country = request.ShippingDetails.CountryCode,
                    Line1 = request.ShippingDetails.Street,
                    PostalCode = request.ShippingDetails.ZipCode,
                    State = request.ShippingDetails.State
                }
            };

            var billingAddress = new AddressOptions
            {
                City = request.BillingDetails.City ?? request.ShippingDetails.City,
                Country = request.BillingDetails.CountryCode ?? request.ShippingDetails.CountryCode,
                Line1 = request.BillingDetails.Street ?? request.ShippingDetails.Street,
                PostalCode = request.BillingDetails.ZipCode ?? request.ShippingDetails.ZipCode,
                State = request.BillingDetails.State ?? request.ShippingDetails.State
            };

            var options = new CustomerCreateOptions
            {

                Email = request.Email,
                Name = request.FirstName + " " + request.LastName,
                Phone = request.PhoneNumber,
                Address = billingAddress,
                Shipping = shippingAddress
            };

            var service = new CustomerService();
            await service.CreateAsync(options);
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Authorize]
    [MapToApiVersion(1)]
    [EnableCors("Admin")]
    public async Task<IActionResult> Get()
    {
        try
        {
            var token = HttpContext.Request.Headers.Authorization.ToString().Replace("Bearer ", "");

            FirebaseToken decoded = await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token);

            if (decoded.Claims["email"] == null || string.IsNullOrEmpty(decoded.Claims["email"].ToString()))
            {
                return BadRequest("Email cannot be null");
            }

            var email = decoded.Claims["email"].ToString();

            var userSearchOptions = new CustomerSearchOptions { Limit = 1, Query = $"email: '{email}'" };
            var userSearchService = new CustomerService();

            var user = (await userSearchService.SearchAsync(userSearchOptions)).FirstOrDefault();

            if (user == null)
            {
                return BadRequest("No user found with the email " + email);
            }

            return Ok(new UserDTO(
                user.Email,
                user.Name.Split(' ')[0],
                user.Name.Split(' ')[1],
                user.Phone,
                user.Id,
                new ShippingAddress(
                    user.Shipping.Phone,
                    user.Shipping.Address.Line1,
                    user.Shipping.Address.PostalCode,
                    user.Shipping.Address.City,
                    user.Shipping.Address.Country,
                    user.Shipping.Address.State),
                new BillingAddress(
                    user.Address.Line1,
                    user.Address.PostalCode,
                    user.Address.City,
                    user.Address.Country,
                    user.Address.State
                )
            ));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    [Authorize]
    [MapToApiVersion(1)]
    public async Task<IActionResult> Put([FromQuery] string id, [FromBody] UpdateUserRequest request)
    {
        try
        {
            var customerService = new CustomerService();

            var customer = customerService.Get(id);

            var customerUpdateOptions = new CustomerUpdateOptions
            {
                Name = request.FirstName + " " + request.LastName,
                Phone = request.PhoneNumber,
                Shipping = new ShippingOptions
                {
                    Name = request.FirstName + " " + request.LastName,
                    Phone = request.PhoneNumber,
                    Address = new AddressOptions
                    {
                        City = request.ShippingDetails.City,
                        Country = request.ShippingDetails.CountryCode,
                        Line1 = request.ShippingDetails.Street,
                        PostalCode = request.ShippingDetails.ZipCode,
                        State = request.ShippingDetails.State
                    }
                },
                Address = new AddressOptions
                {
                    City = request.BillingDetails.City ?? request.ShippingDetails.City,
                    Country = request.BillingDetails.CountryCode ?? request.ShippingDetails.CountryCode,
                    Line1 = request.BillingDetails.Street ?? request.ShippingDetails.Street,
                    PostalCode = request.BillingDetails.ZipCode ?? request.ShippingDetails.ZipCode,
                    State = request.BillingDetails.State ?? request.ShippingDetails.State

                }

            };

            await customerService.UpdateAsync(id, customerUpdateOptions);

            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex);
        }
    }
}
