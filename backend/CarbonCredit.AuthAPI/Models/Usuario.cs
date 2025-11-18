using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarbonCredit.AuthAPI.Models
{
    public enum TipoUsuario
    {
        INVESTIDOR,
        EMPRESA_COMPRADORA,
        PROPRIETARIO_TERRA,
        ADMIN
    }

    public enum StatusConta
    {
        ATIVO,
        PENDENTE_VERIFICACAO,
        SUSPENSO,
        INATIVO
    }

    public enum TipoPessoa
    {
        FISICA,
        JURIDICA
    }

    [Table("usuarios")]
    public class Usuario : IBaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Senha { get; set; } = string.Empty;

        [Required]
        [Column("tipo_usuario")]
        public TipoUsuario TipoUsuario { get; set; }

        [Column("status_conta")]
        public StatusConta StatusConta { get; set; } = StatusConta.PENDENTE_VERIFICACAO;

        [Required]
        [Column("tipo_pessoa")]
        public TipoPessoa TipoPessoa { get; set; }

        [MaxLength(11)]
        public string? Cpf { get; set; }

        [MaxLength(14)]
        public string? Cnpj { get; set; }

        [MaxLength(255)]
        [Column("razao_social")]
        public string? RazaoSocial { get; set; }

        [MaxLength(20)]
        public string? Telefone { get; set; }

        [Column("data_nascimento")]
        public DateTime? DataNascimento { get; set; }

        [MaxLength(42)]
        [Column("endereco_carteira_blockchain")]
        public string? EnderecoCarteiraBlockchain { get; set; }

        [MaxLength(512)]
        [Column("documento_verificacao_url")]
        public string? DocumentoVerificacaoUrl { get; set; }

        [Column("ultimo_login")]
        public DateTime? UltimoLogin { get; set; }

        [Column("data_criacao")]
        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

        [Column("data_atualizacao")]
        public DateTime DataAtualizacao { get; set; } = DateTime.UtcNow;

        [Column("senha_reset_token")]
        public string? SenhaResetToken { get; set; }

        [Column("senha_reset_token_expira_em")]
        public DateTime? SenhaResetTokenExpiraEm { get; set; }

    }
}