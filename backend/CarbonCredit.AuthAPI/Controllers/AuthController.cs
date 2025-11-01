using Microsoft.AspNetCore.Mvc;
using CarbonCredit.AuthAPI.Models.DTOs;
using CarbonCredit.AuthAPI.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace CarbonCredit.AuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        /// <summary>
        /// Inicia o fluxo de recuperação de senha para um usuário.
        /// </summary>
        /// <param name="solicitacaoDto">O DTO contendo o email do usuário.</param>
        /// <returns>Uma resposta indicando que o processo foi iniciado.</returns>
        [HttpPost("solicitar-recuperacao")]
        public async Task<ActionResult<AuthResponseDto>> SolicitarRecuperacao([FromBody] SolicitarRecuperacaoDto solicitacaoDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthResponseDto { Success = false, Message = "Formato de e-mail inválido." });
            }

            var resultado = await _authService.SolicitarRecuperacaoSenhaAsync(solicitacaoDto.Email);

            if (!resultado.Success)
            {
                return StatusCode(500, new AuthResponseDto { Success = false, Message = "Ocorreu um erro ao processar sua solicitação." });
            }

            return Ok(resultado);
        }

        /// <summary>
        /// Altera a senha do usuário autenticado.
        /// </summary>
        /// <param name="changePasswordDto">Dados para alteração de senha.</param>
        /// <returns>Resposta da operação de alteração de senha.</returns>
        [HttpPost("alterar-senha")]
        [Authorize]
        public async Task<ActionResult<AuthResponseDto>> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized(new AuthResponseDto { Success = false, Message = "Token inválido ou ID de usuário ausente." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthResponseDto { Success = false, Message = "Dados inválidos." });
            }

            var resultado = await _authService.ChangePasswordAsync(userId, changePasswordDto);

            if (resultado.Success)
            {
                return Ok(resultado);
            }

            // Retorna BadRequest para erros como "Senha atual incorreta"
            return BadRequest(resultado);
        }

        /// <summary>
        /// Atualiza os dados do perfil do usuário autenticado.
        /// </summary>
        /// <param name="updateDto">Novos dados do perfil.</param>
        /// <returns>Resposta da operação de atualização.</returns>
        [HttpPut("perfil")]
        [Authorize] // Protege a rota, apenas usuários com token válido podem acessar
        public async Task<ActionResult<AuthResponseDto>> UpdatePerfil([FromBody] UpdateUsuarioDto updateDto)
        {
            // Pega o ID do usuário a partir do token JWT
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null || !int.TryParse(userIdClaim.Value, out var userId))
            {
                return Unauthorized(new AuthResponseDto { Success = false, Message = "Token inválido ou ID de usuário ausente." });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthResponseDto { Success = false, Message = "Dados inválidos." });
            }

            var resultado = await _authService.UpdateUsuarioAsync(userId, updateDto);

            if (resultado.Success)
            {
                return Ok(resultado);
            }

            return BadRequest(resultado);
        }

        /// <summary>
        /// Registra um novo usuário no sistema
        /// </summary>
        /// <param name="registroDto">Dados do usuário para registro</param>
        /// <returns>Resposta da operação de registro</returns>
        [HttpPost("registro")]
        public async Task<ActionResult<AuthResponseDto>> Registro([FromBody] RegistroDto registroDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                return BadRequest(new AuthResponseDto
                {
                    Success = false,
                    Message = $"Dados inválidos: {string.Join(", ", errors)}"
                });
            }

            var resultado = await _authService.RegistrarUsuarioAsync(registroDto);

            if (resultado.Success)
            {
                return Ok(resultado);
            }

            return BadRequest(resultado);
        }

        /// <summary>
        /// Realiza o login do usuário
        /// </summary>
        /// <param name="loginDto">Credenciais de login</param>
        /// <returns>Resposta da operação de login</returns>
        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                return BadRequest(new AuthResponseDto
                {
                    Success = false,
                    Message = $"Dados inválidos: {string.Join(", ", errors)}"
                });
            }

            var resultado = await _authService.LoginAsync(loginDto);

            if (resultado.Success)
            {
                return Ok(resultado);
            }

            return Unauthorized(resultado);
        }

        /// <summary>
        /// Redefine a senha do usuário usando um token de recuperação.
        /// </summary>
        /// <param name="redefinirSenhaDto">Dados para redefinição de senha.</param>
        /// <returns>Resposta da operação de redefinição.</returns>
        [HttpPost("redefinir-senha")]
        public async Task<ActionResult<AuthResponseDto>> RedefinirSenha([FromBody] RedefinirSenhaDto redefinirSenhaDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new AuthResponseDto { Success = false, Message = "Dados inválidos." });
            }

            var resultado = await _authService.RedefinirSenhaAsync(redefinirSenhaDto);

            if (resultado.Success)
            {
                return Ok(resultado);
            }

            return BadRequest(resultado);
        }

        /// <summary>
        /// Verifica se um usuário existe pelo email
        /// </summary>
        /// <param name="email">Email do usuário</param>
        /// <returns>True se o usuário existe, False caso contrário</returns>
        [HttpGet("usuario-existe")]
        public async Task<ActionResult<bool>> UsuarioExiste([FromQuery] string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email é obrigatório");
            }

            var existe = await _authService.UsuarioExisteAsync(email);
            return Ok(existe);
        }
    }
}

