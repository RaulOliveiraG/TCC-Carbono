using CarbonCredit.AuthAPI.Services.Blockchain;
using System.Text.Json.Serialization;

namespace CarbonCredit.AuthAPI.Data.Mocks
{
    public static class MockDatabase
    {
        public static readonly List<NftDto> Nfts = new List<NftDto>
        {
            new NftDto
            {
                Id = "1", Owner = "0x1234...5678",
                Metadata = new NftMetadataDto
                {
                    Name = "Crédito de Carbono - Amazônia #001",
                    Description = "10 toneladas de CO2 compensadas por reflorestamento na Amazônia.",
                    Image = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1932&auto=format&fit=crop",
                    Attributes = new List<NftAttributeDto>
                    {
                        new NftAttributeDto { TraitType = "Região", Value = "Amazônia" },
                        new NftAttributeDto { TraitType = "Créditos (Ton CO2)", Value = 10 },
                        new NftAttributeDto { TraitType = "Preço (MATIC)", Value = 1.5 }
                    }
                }
            },
            new NftDto
            {
                Id = "2", Owner = "0xABCD...EFGH",
                Metadata = new NftMetadataDto
                {
                    Name = "Crédito de Carbono - Cerrado #002",
                    Description = "5 toneladas de CO2 compensadas pela preservação do Cerrado.",
                    Image = "https://images.unsplash.com/photo-1573017383838-6610b9b5825a?q=80&w=1740&auto=format&fit=crop",
                    Attributes = new List<NftAttributeDto>
                    {
                        new NftAttributeDto { TraitType = "Região", Value = "Cerrado" },
                        new NftAttributeDto { TraitType = "Créditos (Ton CO2)", Value = 5 },
                        new NftAttributeDto { TraitType = "Preço (MATIC)", Value = 0.8 }
                    }
                }
            },
            new NftDto
            {
                Id = "3", Owner = "0x5555...9999",
                Metadata = new NftMetadataDto
                {
                    Name = "Crédito de Carbono - Mata Atlântica #003",
                    Description = "20 toneladas de CO2 compensadas por projeto de recuperação.",
                    Image = "https://images.unsplash.com/photo-1585562553224-07873f136894?q=80&w=1803&auto=format&fit=crop",
                    Attributes = new List<NftAttributeDto>
                    {
                        new NftAttributeDto { TraitType = "Mata Atlântica", Value = "Mata Atlântica" },
                        new NftAttributeDto { TraitType = "Créditos (Ton CO2)", Value = 20 },
                        new NftAttributeDto { TraitType = "Preço (MATIC)", Value = 2.2 }
                    }
                }
            },
            new NftDto
            {
                Id = "4", Owner = "0xABCD...EFGH",
                Metadata = new NftMetadataDto
                {
                    Name = "Crédito de Carbono - Cerrado #004",
                    Description = "12 toneladas de CO2 compensadas pela preservação do Cerrado.",
                    Image = "https://images.unsplash.com/photo-1552038753-b48347fc749b?q=80&w=1740&auto=format&fit=crop",
                    Attributes = new List<NftAttributeDto>
                    {
                        new NftAttributeDto { TraitType = "Região", Value = "Cerrado" },
                        new NftAttributeDto { TraitType = "Créditos (Ton CO2)", Value = 12 },
                        new NftAttributeDto { TraitType = "Preço (MATIC)", Value = 1.1 }
                    }
                }
            }
        };
    }
}