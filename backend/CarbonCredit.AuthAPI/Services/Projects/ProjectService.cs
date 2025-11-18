using CarbonCredit.AuthAPI.Data;
using CarbonCredit.AuthAPI.Models;
using CarbonCredit.AuthAPI.Models.DTOs;
using CarbonCredit.AuthAPI.Services.Blockchain;
using Nethereum.JsonRpc.Client;
using Thirdweb;

namespace CarbonCredit.AuthAPI.Services.Projects
{
    public class ProjectService : IProjectService
    {
        private readonly ApplicationDbContext _context;
        private readonly IBlockchainService _blockchainService;
        private readonly ILogger<ProjectService> _logger;

        public ProjectService(
            ApplicationDbContext context,
            IBlockchainService blockchainService,
            ILogger<ProjectService> logger)
        {
            _context = context;
            _blockchainService = blockchainService;
            _logger = logger;
        }


        public async Task<AuthResponseDto> CreateProjectAsync(CreateProjectDto createProjectDto)
        {
            try
            {
                _logger.LogInformation("Iniciando criação de novo projeto: {ProjectName}", createProjectDto.Name);

                var project = new Project
                {
                    Name = createProjectDto.Name,
                    Description = createProjectDto.Description,
                    Location = createProjectDto.Location,
                    CarbonCreditsGenerated = createProjectDto.CarbonCreditsGenerated,
                    Price = createProjectDto.Price,
                    ImageUrl = createProjectDto.ImageUrl
                };

                await _context.Projects.AddAsync(project);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Projeto {ProjectId} salvo inicialmente no banco de dados.", project.Id);

                var nftMetadata = new NftMetadataDto
                {
                    Name = project.Name,
                    Description = project.Description,
                    Image = project.ImageUrl,
                };

                _logger.LogInformation("Mintando NFT para o projeto {ProjectId}...", project.Id);

                var transactionHash = await _blockchainService.MintNftAsync(nftMetadata);

                _logger.LogInformation("NFT mintado com sucesso. Hash da transação: {TransactionHash}", transactionHash);

                project.TransactionHash = transactionHash;
                project.NftTokenId = "Consultar via Hash";

                _context.Projects.Update(project);
                await _context.SaveChangesAsync();
                _logger.LogInformation("Projeto {ProjectId} atualizado com as informações da blockchain.", project.Id);

                return new AuthResponseDto { Success = true, Message = "Projeto criado e NFT mintado com sucesso." };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao criar projeto e mintar NFT.");
                return new AuthResponseDto { Success = false, Message = "Ocorreu um erro interno ao criar o projeto." };
            }
        }
    }
}