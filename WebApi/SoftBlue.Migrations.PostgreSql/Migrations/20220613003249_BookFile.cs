using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SoftBlue.Migrations.PostgreSql.Migrations
{
    public partial class BookFile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsUploaded",
                table: "Books",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "Size",
                table: "Books",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsUploaded",
                table: "Books");

            migrationBuilder.DropColumn(
                name: "Size",
                table: "Books");
        }
    }
}
