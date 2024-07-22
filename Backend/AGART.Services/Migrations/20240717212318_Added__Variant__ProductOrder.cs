using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AGART.Services.Migrations
{
    /// <inheritdoc />
    public partial class Added__Variant__ProductOrder : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Variant",
                table: "OrderProduct",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Variant",
                table: "OrderProduct");
        }
    }
}
