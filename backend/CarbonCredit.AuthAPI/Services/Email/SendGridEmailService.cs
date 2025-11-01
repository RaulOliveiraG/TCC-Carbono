using SendGrid;
using SendGrid.Helpers.Mail;
using System.Threading.Tasks;

namespace CarbonCredit.AuthAPI.Services.Email
{
    public class SendGridEmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<SendGridEmailService> _logger;

        public SendGridEmailService(IConfiguration configuration, ILogger<SendGridEmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            var apiKey = _configuration["SendGrid:ApiKey"];
            var fromEmail = _configuration["SendGrid:FromEmail"];
            var fromName = _configuration["SendGrid:FromName"];

            if (string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(fromEmail) || string.IsNullOrEmpty(fromName))
            {
                _logger.LogError("Configurações do SendGrid não encontradas ou incompletas.");
                return;
            }

            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(fromEmail, fromName);
            var toAddress = new EmailAddress(to);

            var msg = MailHelper.CreateSingleEmail(from, toAddress, subject, null, body);

            var response = await client.SendEmailAsync(msg);

            if (response.IsSuccessStatusCode)
            {
                _logger.LogInformation("E-mail enviado para {To} com sucesso via SendGrid.", to);
            }
            else
            {
                _logger.LogError("Falha ao enviar e-mail via SendGrid. Status: {StatusCode}. Resposta: {ResponseBody}",
                    response.StatusCode,
                    await response.Body.ReadAsStringAsync());
            }
        }
    }
}