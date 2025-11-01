using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarbonCredit.AuthAPI.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarCamposRecuperacaoSenha : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "senha_reset_token",
                table: "usuarios",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "senha_reset_token_expira_em",
                table: "usuarios",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "senha_reset_token",
                table: "usuarios");

            migrationBuilder.DropColumn(
                name: "senha_reset_token_expira_em",
                table: "usuarios");
        }
    }
}
