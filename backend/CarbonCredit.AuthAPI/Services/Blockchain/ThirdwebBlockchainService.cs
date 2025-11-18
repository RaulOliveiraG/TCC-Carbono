using CarbonCredit.AuthAPI.Services.Blockchain;
using Nethereum.ABI;
using System.Numerics;
using System.Text.Json;
using Thirdweb;

namespace CarbonCredit.AuthAPI.Services.Blockchain
{
    public class ThirdwebBlockchainService : IBlockchainService
    {
        private readonly ThirdwebClient _client;
        private readonly string _contractAddress;
        private readonly IConfiguration _configuration;
        private readonly ILogger<ThirdwebBlockchainService> _logger;
        private const ulong CHAIN_ID = 80002;
        private static readonly HttpClient _httpClient = new HttpClient();

        public ThirdwebBlockchainService(IConfiguration configuration, ILogger<ThirdwebBlockchainService> logger)
        {
            _configuration = configuration;
            _logger = logger;

            var secretKey = _configuration["ThirdwebSettings:SecretKey"];
            _contractAddress = _configuration["ThirdwebSettings:ContractAddress"]
                ?? throw new InvalidOperationException("ContractAddress não configurado no appsettings.json");

            if (string.IsNullOrEmpty(secretKey))
            {
                throw new InvalidOperationException("Thirdweb SecretKey não configurada no appsettings.json");
            }

            _client = ThirdwebClient.Create(secretKey: secretKey);
        }

        public async Task<List<NftDto>> GetAllNftsAsync()
        {
            try
            {
                var contract = await ThirdwebContract.Create(_client, _contractAddress, CHAIN_ID);
                var totalSupply = await contract.Read<BigInteger>("totalSupply");
                var nftList = new List<NftDto>();

                for (int i = 0; i < totalSupply; i++)
                {
                    var tokenId = await contract.Read<BigInteger>("tokenByIndex", i);
                    var tokenUri = await contract.Read<string>("tokenURI", tokenId);
                    var owner = await contract.Read<string>("ownerOf", tokenId);

                    tokenUri = tokenUri.Replace("ipfs://", "https://ipfs.io/ipfs/");
                    var metadataJson = await _httpClient.GetStringAsync(tokenUri);
                    var metadata = JsonSerializer.Deserialize<NftMetadataDto>(metadataJson, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

                    if (metadata != null)
                    {
                        nftList.Add(new NftDto
                        {
                            Id = tokenId.ToString(),
                            Owner = owner,
                            Metadata = metadata
                        });
                    }
                }
                return nftList;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao buscar NFTs.");
                throw;
            }
        }


        public async Task<string> MintNftAsync(NftMetadataDto metadata)
        {
            try
            {
                var contract = await ThirdwebContract.Create(_client, _contractAddress, CHAIN_ID);

                var wallet = await ServerWallet.Create(
                    _client,
                    "CarbonCreditTCC Wallet"
                );

                var receiverAddress = await wallet.GetAddress();
                _logger.LogInformation("Endereço da Carteira de Servidor (Claimer): {ServerWalletAddress}", receiverAddress);

                var weiValue = new BigInteger(0);
                var quantity = new BigInteger(1); 

                var transactionResult = await contract.Write(
                    wallet,
                    "claim",
                    weiValue,
                    receiverAddress, 
                    quantity       
                );

                return transactionResult.TransactionHash;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Erro ao dar claim no NFT.");
                throw;
            }
            finally
            {
            }
        }
    }
}