using System.ComponentModel.DataAnnotations;

namespace CarbonCredit.AuthAPI.Models.DTOs
{
    public class ChangePasswordDto
    {
        [Required(ErrorMessage = "Senha atual é obrigatória")]
        public string SenhaAtual { get; set; } = string.Empty;

        [Required(ErrorMessage = "Nova senha é obrigatória")]
        [MinLength(6, ErrorMessage = "Nova senha deve ter no mínimo 6 caracteres")]
        public string NovaSenha { get; set; } = string.Empty;

        [Required(ErrorMessage = "Confirmação de senha é obrigatória")]
        [Compare("NovaSenha", ErrorMessage = "Nova senha e confirmação devem ser iguais")]
        public string ConfirmacaoNovaSenha { get; set; } = string.Empty;
    }
}