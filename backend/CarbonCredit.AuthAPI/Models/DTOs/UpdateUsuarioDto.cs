using System.ComponentModel.DataAnnotations;

namespace CarbonCredit.AuthAPI.Models.DTOs
{
    public class UpdateUsuarioDto
    {
        [Required(ErrorMessage = "Nome é obrigatório")]
        [MaxLength(255, ErrorMessage = "Nome deve ter no máximo 255 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [MaxLength(20, ErrorMessage = "Telefone deve ter no máximo 20 caracteres")]
        public string? Telefone { get; set; }
    }
}