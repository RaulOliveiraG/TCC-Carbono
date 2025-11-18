using CarbonCredit.AuthAPI.Data.Mocks; 
using CarbonCredit.AuthAPI.Services.Blockchain;
using Microsoft.AspNetCore.Mvc;

namespace CarbonCredit.AuthAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NftsController : ControllerBase
    {
        private readonly ILogger<NftsController> _logger;

        public NftsController(ILogger<NftsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<NftDto>), StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<NftDto>> GetAllNfts(
            [FromQuery] string? regiao,
            [FromQuery] double? precoMax,
            [FromQuery] int? creditosMin)
        {
            _logger.LogInformation("Buscando NFTs com filtros: Regiao={Regiao}, PrecoMax={PrecoMax}, CreditosMin={CreditosMin}", regiao, precoMax, creditosMin);

            IEnumerable<NftDto> filteredNfts = MockDatabase.Nfts;

            if (!string.IsNullOrEmpty(regiao))
            {
                filteredNfts = filteredNfts.Where(n => n.Metadata.Attributes
                    .Any(a => a.TraitType == "Região" && a.Value.ToString().Equals(regiao, StringComparison.OrdinalIgnoreCase)));
            }

            if (precoMax.HasValue)
            {
                filteredNfts = filteredNfts.Where(n => n.Metadata.Attributes
                    .Any(a => a.TraitType == "Preço (MATIC)" && Convert.ToDouble(a.Value) <= precoMax.Value));
            }

            if (creditosMin.HasValue)
            {
                filteredNfts = filteredNfts.Where(n => n.Metadata.Attributes
                    .Any(a => a.TraitType == "Créditos (Ton CO2)" && Convert.ToInt32(a.Value) >= creditosMin.Value));
            }

            return Ok(filteredNfts.ToList());
        }
    }
}