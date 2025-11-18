using System.ComponentModel.DataAnnotations;

namespace CarbonCredit.AuthAPI.Models.DTOs
{
    public class CreateProjectDto
    {
        [Required(ErrorMessage = "Nome do projeto é obrigatório")]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Descrição é obrigatória")]
        public string Description { get; set; } = string.Empty;

        [Required(ErrorMessage = "Localização é obrigatória")]
        public string Location { get; set; } = string.Empty;

        [Required(ErrorMessage = "Créditos de carbono são obrigatórios")]
        [Range(0.01, double.MaxValue, ErrorMessage = "Créditos devem ser maiores que zero")]
        public decimal CarbonCreditsGenerated { get; set; }

        [Required(ErrorMessage = "Preço é obrigatório")]
        [Range(0.0, double.MaxValue, ErrorMessage = "Preço não pode ser negativo")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "URL da imagem é obrigatória")]
        [Url(ErrorMessage = "URL da imagem deve ser válida")]
        public string ImageUrl { get; set; } = string.Empty;
    }
}