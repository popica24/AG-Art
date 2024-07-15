using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AGART.Services.Migrations
{
    /// <inheritdoc />
    public partial class Added__Billing__Shipping__To__Order : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "State",
                table: "Order",
                newName: "ShippingState");

            migrationBuilder.RenameColumn(
                name: "PostalCode",
                table: "Order",
                newName: "ShippingPostalCode");

            migrationBuilder.RenameColumn(
                name: "Phone",
                table: "Order",
                newName: "ShippingCountry");

            migrationBuilder.RenameColumn(
                name: "City",
                table: "Order",
                newName: "ShippingCity");

            migrationBuilder.RenameColumn(
                name: "AddressLine2",
                table: "Order",
                newName: "ShippingAddress");

            migrationBuilder.RenameColumn(
                name: "AddressLine1",
                table: "Order",
                newName: "BillingState");

            migrationBuilder.AddColumn<string>(
                name: "BillingAddress",
                table: "Order",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BillingCity",
                table: "Order",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BillingCountry",
                table: "Order",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BillingPostalCode",
                table: "Order",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BillingAddress",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "BillingCity",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "BillingCountry",
                table: "Order");

            migrationBuilder.DropColumn(
                name: "BillingPostalCode",
                table: "Order");

            migrationBuilder.RenameColumn(
                name: "ShippingState",
                table: "Order",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "ShippingPostalCode",
                table: "Order",
                newName: "PostalCode");

            migrationBuilder.RenameColumn(
                name: "ShippingCountry",
                table: "Order",
                newName: "Phone");

            migrationBuilder.RenameColumn(
                name: "ShippingCity",
                table: "Order",
                newName: "City");

            migrationBuilder.RenameColumn(
                name: "ShippingAddress",
                table: "Order",
                newName: "AddressLine2");

            migrationBuilder.RenameColumn(
                name: "BillingState",
                table: "Order",
                newName: "AddressLine1");
        }
    }
}
