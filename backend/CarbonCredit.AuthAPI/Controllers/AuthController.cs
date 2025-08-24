using Microsoft.AspNetCore.Mvc;
using CarbonCredit.AuthAPI.Models.DTOs;
using CarbonCredit.AuthAPI.Services;

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

