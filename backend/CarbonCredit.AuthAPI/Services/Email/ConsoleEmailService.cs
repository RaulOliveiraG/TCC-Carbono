namespace CarbonCredit.AuthAPI.Services.Email
{
    public class ConsoleEmailService : IEmailService
    {
        private readonly ILogger<ConsoleEmailService> _logger;

        public ConsoleEmailService(ILogger<ConsoleEmailService> logger)
        {
            _logger = logger;
        }

        public Task SendEmailAsync(string to, string subject, string body)
        {
            _logger.LogInformation("--- NOVO E-MAIL (SIMULAÇÃO) ---");
            _logger.LogInformation("Para: {To}", to);
            _logger.LogInformation("Assunto: {Subject}", subject);
            _logger.LogInformation("Corpo: {Body}", body);
            _logger.LogInformation("---------------------------------");

            return Task.CompletedTask;
        }
    }
}