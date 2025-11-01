using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using CarbonCredit.AuthAPI.Data;
using CarbonCredit.AuthAPI.Models;
using CarbonCredit.AuthAPI.Models.DTOs;
using CarbonCredit.AuthAPI.Services.Email;
using System.Security.Cryptography;

namespace CarbonCredit.AuthAPI.Services
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;

        public AuthService(ApplicationDbContext context, IConfiguration configuration, IEmailService emailService)
        {
            _context = context;
            _configuration = configuration;
            _emailService = emailService;
        }

        public async Task<AuthResponseDto> RedefinirSenhaAsync(RedefinirSenhaDto redefinirSenhaDto)
        {
            try
            {
                var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == redefinirSenhaDto.Email.ToLower());

                if (usuario == null)
                {
                    return new AuthResponseDto { Success = false, Message = "Token ou e-mail inválido." };
                }

                if (usuario.SenhaResetToken != redefinirSenhaDto.Token)
                {
                    return new AuthResponseDto { Success = false, Message = "Token inválido." };
                }

                if (usuario.SenhaResetTokenExpiraEm < DateTime.UtcNow)
                {
                    return new AuthResponseDto { Success = false, Message = "Token expirado." };
                }

                usuario.Senha = BCrypt.Net.BCrypt.HashPassword(redefinirSenhaDto.NovaSenha);

                usuario.SenhaResetToken = null;
                usuario.SenhaResetTokenExpiraEm = null;

                await _context.SaveChangesAsync();

                return new AuthResponseDto { Success = true, Message = "Senha redefinida com sucesso." };
            }
            catch (Exception ex)
            {
                return new AuthResponseDto { Success = false, Message = "Ocorreu um erro ao redefinir a senha." };
            }
        }

        public async Task<AuthResponseDto> ChangePasswordAsync(int userId, ChangePasswordDto changePasswordDto)
        {
            try
            {
                var usuario = await _context.Usuarios.FindAsync(userId);

                if (usuario == null)
                {
                    return new AuthResponseDto { Success = false, Message = "Usuário não encontrado." };
                }

                if (!BCrypt.Net.BCrypt.Verify(changePasswordDto.SenhaAtual, usuario.Senha))
                {
                    return new AuthResponseDto { Success = false, Message = "Senha atual incorreta." };
                }

                usuario.Senha = BCrypt.Net.BCrypt.HashPassword(changePasswordDto.NovaSenha);

                _context.Usuarios.Update(usuario);
                await _context.SaveChangesAsync();

                return new AuthResponseDto
                {
                    Success = true,
                    Message = "Senha alterada com sucesso."
                };
            }
            catch (Exception ex)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = $"Erro interno do servidor: {ex.Message}"
                };
            }
        }

        public async Task<AuthResponseDto> UpdateUsuarioAsync(int userId, UpdateUsuarioDto updateDto)
        {
            try
            {
                var usuario = await _context.Usuarios.FindAsync(userId);

                if (usuario == null)
                {
                    return new AuthResponseDto { Success = false, Message = "Usuário não encontrado." };
                }

                usuario.Nome = updateDto.Nome;
                usuario.Telefone = updateDto.Telefone;
                _context.Usuarios.Update(usuario);
                await _context.SaveChangesAsync();

                var usuarioDto = MapearUsuarioParaDto(usuario);

                return new AuthResponseDto
                {
                    Success = true,
                    Message = "Perfil atualizado com sucesso.",
                    Usuario = usuarioDto
                };
            }
            catch (Exception ex)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = $"Erro interno do servidor: {ex.Message}"
                };
            }
        }

        public async Task<AuthResponseDto> SolicitarRecuperacaoSenhaAsync(string email)
        {
            try
            {
                var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == email.ToLower());

                if (usuario == null)
                {
                    return new AuthResponseDto { Success = true, Message = "Se um usuário com este e-mail existir, um link de recuperação será enviado." };
                }

                var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(64));

                usuario.SenhaResetToken = token;
                usuario.SenhaResetTokenExpiraEm = DateTime.UtcNow.AddHours(1); 

                await _context.SaveChangesAsync();

                var resetLink = $"https://sua-app-url/redefinir-senha?token={token}";
                var emailBody = $"<p>Olá, {usuario.Nome}.</p>" +
                                $"<p>Você solicitou a redefinição de sua senha. Por favor, clique no link abaixo para criar uma nova senha:</p>" +
                                $"<a href='{resetLink}'>Redefinir Senha</a>" +
                                $"<p>Se você não solicitou isso, por favor, ignore este e-mail.</p>" +
                                $"<p>Este token é válido por 1 hora.</p>" +
                                $"<p>Seu token (para teste): {token}</p>"; 

                await _emailService.SendEmailAsync(usuario.Email, "Recuperação de Senha - Carbon Credit", emailBody);

                return new AuthResponseDto { Success = true, Message = "Se um usuário com este e-mail existir, um link de recuperação será enviado." };
            }
            catch (Exception ex)
            {
                return new AuthResponseDto { Success = false, Message = "Ocorreu um erro ao processar sua solicitação." };
            }
        }

        public async Task<AuthResponseDto> RegistrarUsuarioAsync(RegistroDto registroDto)
        {
            try
            {
                if (await UsuarioExisteAsync(registroDto.Email))
                {
                    return new AuthResponseDto
                    {
                        Success = false,
                        Message = "Usuário já existe com este email"
                    };
                }

                if (registroDto.TipoPessoa == TipoPessoa.FISICA)
                {
                    if (string.IsNullOrEmpty(registroDto.Cpf))
                    {
                        return new AuthResponseDto
                        {
                            Success = false,
                            Message = "CPF é obrigatório para pessoa física"
                        };
                    }

                    if (await _context.Usuarios.AnyAsync(u => u.Cpf == registroDto.Cpf))
                    {
                        return new AuthResponseDto
                        {
                            Success = false,
                            Message = "CPF já cadastrado"
                        };
                    }
                }
                else if (registroDto.TipoPessoa == TipoPessoa.JURIDICA)
                {
                    if (string.IsNullOrEmpty(registroDto.Cnpj))
                    {
                        return new AuthResponseDto
                        {
                            Success = false,
                            Message = "CNPJ é obrigatório para pessoa jurídica"
                        };
                    }

                    if (await _context.Usuarios.AnyAsync(u => u.Cnpj == registroDto.Cnpj))
                    {
                        return new AuthResponseDto
                        {
                            Success = false,
                            Message = "CNPJ já cadastrado"
                        };
                    }
                }

                if (!string.IsNullOrEmpty(registroDto.EnderecoCarteiraBlockchain))
                {
                    if (await _context.Usuarios.AnyAsync(u => u.EnderecoCarteiraBlockchain == registroDto.EnderecoCarteiraBlockchain))
                    {
                        return new AuthResponseDto
                        {
                            Success = false,
                            Message = "Endereço da carteira blockchain já cadastrado"
                        };
                    }
                }

                var usuario = new Usuario
                {
                    Nome = registroDto.Nome,
                    Email = registroDto.Email.ToLower(),
                    Senha = BCrypt.Net.BCrypt.HashPassword(registroDto.Senha),
                    TipoUsuario = registroDto.TipoUsuario,
                    TipoPessoa = registroDto.TipoPessoa,
                    Cpf = registroDto.TipoPessoa == TipoPessoa.FISICA ? registroDto.Cpf : null,
                    Cnpj = registroDto.TipoPessoa == TipoPessoa.JURIDICA ? registroDto.Cnpj : null,
                    RazaoSocial = registroDto.RazaoSocial,
                    Telefone = registroDto.Telefone,
                    DataNascimento = registroDto.DataNascimento,
                    EnderecoCarteiraBlockchain = registroDto.EnderecoCarteiraBlockchain,
                    StatusConta = StatusConta.PENDENTE_VERIFICACAO
                };

                _context.Usuarios.Add(usuario);
                await _context.SaveChangesAsync();

                var usuarioDto = MapearUsuarioParaDto(usuario);
                var token = GerarTokenJwt(usuarioDto);

                return new AuthResponseDto
                {
                    Success = true,
                    Message = "Usuário registrado com sucesso",
                    Token = token,
                    Usuario = usuarioDto
                };
            }
            catch (Exception ex)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = $"Erro interno do servidor: {ex.Message}"
                };
            }
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            try
            {
                var usuario = await _context.Usuarios
                    .FirstOrDefaultAsync(u => u.Email == loginDto.Email.ToLower());

                if (usuario == null || !BCrypt.Net.BCrypt.Verify(loginDto.Senha, usuario.Senha))
                {
                    return new AuthResponseDto
                    {
                        Success = false,
                        Message = "Email ou senha inválidos"
                    };
                }

                if (usuario.StatusConta == StatusConta.SUSPENSO)
                {
                    return new AuthResponseDto
                    {
                        Success = false,
                        Message = "Conta suspensa. Entre em contato com o suporte"
                    };
                }

                if (usuario.StatusConta == StatusConta.INATIVO)
                {
                    return new AuthResponseDto
                    {
                        Success = false,
                        Message = "Conta inativa. Entre em contato com o suporte"
                    };
                }

                usuario.UltimoLogin = DateTime.UtcNow;
                await _context.SaveChangesAsync();

                var usuarioDto = MapearUsuarioParaDto(usuario);
                var token = GerarTokenJwt(usuarioDto);

                return new AuthResponseDto
                {
                    Success = true,
                    Message = "Login realizado com sucesso",
                    Token = token,
                    Usuario = usuarioDto
                };
            }
            catch (Exception ex)
            {
                return new AuthResponseDto
                {
                    Success = false,
                    Message = $"Erro interno do servidor: {ex.Message}"
                };
            }
        }

        public async Task<bool> UsuarioExisteAsync(string email)
        {
            return await _context.Usuarios.AnyAsync(u => u.Email == email.ToLower());
        }

        public string GerarTokenJwt(UsuarioDto usuario)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var expiryMinutes = int.Parse(jwtSettings["ExpiryMinutes"] ?? "60");
            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("A chave secreta JWT não pode ser nula ou vazia.");
            }

            var key = Encoding.ASCII.GetBytes(secretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                    new Claim(ClaimTypes.Name, usuario.Nome),
                    new Claim(ClaimTypes.Email, usuario.Email),
                    new Claim("TipoUsuario", usuario.TipoUsuario.ToString()),
                    new Claim("StatusConta", usuario.StatusConta.ToString()),
                    new Claim("TipoPessoa", usuario.TipoPessoa.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(expiryMinutes),
                Issuer = issuer,
                Audience = audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private static UsuarioDto MapearUsuarioParaDto(Usuario usuario)
        {
            return new UsuarioDto
            {
                Id = usuario.Id,
                Nome = usuario.Nome,
                Email = usuario.Email,
                TipoUsuario = usuario.TipoUsuario,
                StatusConta = usuario.StatusConta,
                TipoPessoa = usuario.TipoPessoa,
                Cpf = usuario.Cpf,
                Cnpj = usuario.Cnpj,
                RazaoSocial = usuario.RazaoSocial,
                Telefone = usuario.Telefone,
                DataNascimento = usuario.DataNascimento,
                EnderecoCarteiraBlockchain = usuario.EnderecoCarteiraBlockchain,
                UltimoLogin = usuario.UltimoLogin,
                DataCriacao = usuario.DataCriacao
            };
        }
    }
}

