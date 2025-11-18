using CarbonCredit.AuthAPI.Models.DTOs;
using CarbonCredit.AuthAPI.Services.Projects;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarbonCredit.AuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;
        private readonly ILogger<ProjectsController> _logger;

        public ProjectsController(IProjectService projectService, ILogger<ProjectsController> logger)
        {
            _projectService = projectService;
            _logger = logger;
        }

        /// <summary>
        /// Cria um novo projeto de crédito de carbono e minta o NFT correspondente.
        /// </summary>
        /// <remarks>
        /// Esta rota deve ser protegida no futuro para permitir que apenas administradores ou usuários autorizados criem projetos.
        /// </remarks>
        /// <param name="createProjectDto">Os dados do projeto a ser criado.</param>
        /// <returns>Status da operação.</returns>
        [HttpPost]
        [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(AuthResponseDto), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(string), StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<AuthResponseDto>> CreateProject([FromBody] CreateProjectDto createProjectDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = await _projectService.CreateProjectAsync(createProjectDto);

                if (result.Success)
                {
                    return CreatedAtAction(nameof(CreateProject), result);
                }

                return BadRequest(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro não tratado ao criar o projeto.");
                return StatusCode(500, "Ocorreu um erro interno inesperado.");
            }
        }
    }
}