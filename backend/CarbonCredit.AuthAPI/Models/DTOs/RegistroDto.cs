using System.ComponentModel.DataAnnotations;

namespace CarbonCredit.AuthAPI.Models.DTOs
{
    public class RegistroDto
    {
        [Required(ErrorMessage = "Nome é obrigatório")]
        [MaxLength(255, ErrorMessage = "Nome deve ter no máximo 255 caracteres")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "Email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email deve ter um formato válido")]
        [MaxLength(255, ErrorMessage = "Email deve ter no máximo 255 caracteres")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Senha é obrigatória")]
        [MinLength(6, ErrorMessage = "Senha deve ter no mínimo 6 caracteres")]
        [MaxLength(255, ErrorMessage = "Senha deve ter no máximo 255 caracteres")]
        public string Senha { get; set; } = string.Empty;

        [Required(ErrorMessage = "Confirmação de senha é obrigatória")]
        [Compare("Senha", ErrorMessage = "Senha e confirmação devem ser iguais")]
        public string ConfirmacaoSenha { get; set; } = string.Empty;

        [Required(ErrorMessage = "Tipo de usuário é obrigatório")]
        public TipoUsuario TipoUsuario { get; set; }

        [Required(ErrorMessage = "Tipo de pessoa é obrigatório")]
        public TipoPessoa TipoPessoa { get; set; }

        [MaxLength(11, ErrorMessage = "CPF deve ter no máximo 11 caracteres")]
        public string? Cpf { get; set; }

        [MaxLength(14, ErrorMessage = "CNPJ deve ter no máximo 14 caracteres")]
        public string? Cnpj { get; set; }

        [MaxLength(255, ErrorMessage = "Razão social deve ter no máximo 255 caracteres")]
        public string? RazaoSocial { get; set; }

        [MaxLength(20, ErrorMessage = "Telefone deve ter no máximo 20 caracteres")]
        public string? Telefone { get; set; }

        public DateTime? DataNascimento { get; set; }

        [MaxLength(42, ErrorMessage = "Endereço da carteira blockchain deve ter no máximo 42 caracteres")]
        public string? EnderecoCarteiraBlockchain { get; set; }
    }
}

