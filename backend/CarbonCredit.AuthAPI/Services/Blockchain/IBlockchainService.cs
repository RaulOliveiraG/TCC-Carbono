using CarbonCredit.AuthAPI.Models.DTOs;
using System.Text.Json.Serialization;

namespace CarbonCredit.AuthAPI.Services.Blockchain
{
    public class NftAttributeDto
    {
        [JsonPropertyName("trait_type")]
        public string TraitType { get; set; } = string.Empty;
        public object Value { get; set; } = new();
    }
    public class NftMetadataDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public List<NftAttributeDto> Attributes { get; set; } = new();
    }

    public class NftDto
    {
        public string Id { get; set; } = string.Empty;
        public string Owner { get; set; } = string.Empty;
        public NftMetadataDto Metadata { get; set; } = new();
    }

    public interface IBlockchainService
    {
        /// <summary>
        /// Cria (minta) um novo NFT na blockchain com os metadados fornecidos.
        /// </summary>
        /// <param name="metadata">Os metadados do NFT a ser criado.</param>
        /// <returns>O ID do token do NFT recém-criado.</returns>
        Task<string> MintNftAsync(NftMetadataDto metadata);

        /// <summary>
        /// Busca todos os NFTs do contrato.
        /// </summary>
        /// <returns>Uma lista de DTOs representando cada NFT.</returns>
        Task<List<NftDto>> GetAllNftsAsync();
    }
}