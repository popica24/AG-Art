using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AGART.Services.Migrations
{
    /// <inheritdoc />
    public partial class Addded__Client__Id__ProductOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "Order");

            migrationBuilder.AddColumn<string>(
                name: "ClientId",
                table: "OrderProduct",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "OrderProduct");

            migrationBuilder.AddColumn<string>(
                name: "ClientId",
                table: "Order",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
