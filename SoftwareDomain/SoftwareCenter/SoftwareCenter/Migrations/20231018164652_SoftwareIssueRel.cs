using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SoftwareCenter.Migrations
{
    /// <inheritdoc />
    public partial class SoftwareIssueRel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "SoftwareId",
                table: "UserIssues",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.CreateIndex(
                name: "IX_UserIssues_SoftwareId",
                table: "UserIssues",
                column: "SoftwareId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserIssues_Titles_SoftwareId",
                table: "UserIssues",
                column: "SoftwareId",
                principalTable: "Titles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserIssues_Titles_SoftwareId",
                table: "UserIssues");

            migrationBuilder.DropIndex(
                name: "IX_UserIssues_SoftwareId",
                table: "UserIssues");

            migrationBuilder.AlterColumn<string>(
                name: "SoftwareId",
                table: "UserIssues",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }
    }
}
