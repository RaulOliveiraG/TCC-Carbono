using CarbonCredit.AuthAPI.Models.DTOs;

namespace CarbonCredit.AuthAPI.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegistrarUsuarioAsync(RegistroDto registroDto);
        Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
        Task<bool> UsuarioExisteAsync(string email);
        string GerarTokenJwt(UsuarioDto usuario);
        Task<AuthResponseDto> UpdateUsuarioAsync(int userId, UpdateUsuarioDto updateDto);
        Task<AuthResponseDto> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto);
    }
}