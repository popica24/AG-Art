using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AGART.Services.Migrations
{
    /// <inheritdoc />
    public partial class Added__Payment__Method__To__Orders : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PaymentMethod",
                table: "Order",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentMethod",
                table: "Order");
        }
    }
}
