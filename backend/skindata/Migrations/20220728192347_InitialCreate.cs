using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SkinData.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Skin",
                columns: table => new
                {
                    SkinId = table.Column<string>(type: "text", nullable: false),
                    AccessGuid = table.Column<string>(type: "text", nullable: false),
                    SkinUrl = table.Column<string>(type: "text", nullable: false),
                    SkinName = table.Column<string>(type: "text", nullable: true),
                    Breed = table.Column<int>(type: "int", nullable: false),
                    Pose = table.Column<int>(type: "int", nullable: false),
                    Coverage = table.Column<int>(type: "int", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastViewed = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Skin", x => x.SkinId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Skin");
        }
    }
}
