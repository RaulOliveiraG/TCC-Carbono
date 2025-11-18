// --- INÍCIO DO ARQUIVO: Models/Project.cs ---

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CarbonCredit.AuthAPI.Models
{
    [Table("projects")]
    public class Project : IBaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public string Description { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Location { get; set; } = string.Empty; 

        [Required]
        public decimal CarbonCreditsGenerated { get; set; } 

        [Required]
        public decimal Price { get; set; } 

        [Required]
        [MaxLength(512)]
        public string ImageUrl { get; set; } = string.Empty;

        [MaxLength(255)]
        public string? NftTokenId { get; set; } 

        [MaxLength(255)]
        public string? TransactionHash { get; set; }

        [Column("data_criacao")]
        public DateTime DataCriacao { get; set; } = DateTime.UtcNow;

        [Column("data_atualizacao")]
        public DateTime DataAtualizacao { get; set; } = DateTime.UtcNow;
    }
}