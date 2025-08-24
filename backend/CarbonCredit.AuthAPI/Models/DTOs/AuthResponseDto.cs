namespace CarbonCredit.AuthAPI.Models.DTOs
{
    public class AuthResponseDto
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public string? Token { get; set; }
        public UsuarioDto? Usuario { get; set; }
    }

    public class UsuarioDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public TipoUsuario TipoUsuario { get; set; }
        public StatusConta StatusConta { get; set; }
        public TipoPessoa TipoPessoa { get; set; }
        public string? Cpf { get; set; }
        public string? Cnpj { get; set; }
        public string? RazaoSocial { get; set; }
        public string? Telefone { get; set; }
        public DateTime? DataNascimento { get; set; }
        public string? EnderecoCarteiraBlockchain { get; set; }
        public DateTime? UltimoLogin { get; set; }
        public DateTime DataCriacao { get; set; }
    }
}

