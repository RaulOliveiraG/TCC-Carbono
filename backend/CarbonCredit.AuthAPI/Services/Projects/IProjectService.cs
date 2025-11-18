using CarbonCredit.AuthAPI.Models.DTOs;

namespace CarbonCredit.AuthAPI.Services.Projects
{
    public interface IProjectService
    {
        /// <summary>
        /// Cria um novo projeto, salva no banco de dados e minta o NFT correspondente.
        /// </summary>
        /// <param name="createProjectDto">Dados para a criação do projeto.</param>
        /// <returns>Um DTO de resposta indicando sucesso ou falha.</returns>
        Task<AuthResponseDto> CreateProjectAsync(CreateProjectDto createProjectDto);
    }
}