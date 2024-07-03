using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AGART.Services.Migrations
{
    /// <inheritdoc />
    public partial class Added__Visible__Product : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Visible",
                table: "Product",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Visible",
                table: "Product");
        }
    }
}
