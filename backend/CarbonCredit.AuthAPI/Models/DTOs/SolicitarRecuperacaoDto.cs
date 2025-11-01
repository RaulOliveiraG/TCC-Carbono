using System.ComponentModel.DataAnnotations;

namespace CarbonCredit.AuthAPI.Models.DTOs
{
    public class SolicitarRecuperacaoDto
    {
        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email deve ter um formato válido")]
        public string Email { get; set; } = string.Empty;
    }
}