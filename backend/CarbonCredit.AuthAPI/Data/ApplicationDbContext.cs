using Microsoft.EntityFrameworkCore;
using CarbonCredit.AuthAPI.Models;

namespace CarbonCredit.AuthAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>().ToTable("usuarios");

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
                entity.HasIndex(e => e.Cpf).IsUnique().HasFilter("\"Cpf\" IS NOT NULL");
                entity.HasIndex(e => e.Cnpj).IsUnique().HasFilter("\"Cnpj\" IS NOT NULL");
                entity.HasIndex(e => e.EnderecoCarteiraBlockchain).IsUnique().HasFilter("endereco_carteira_blockchain IS NOT NULL");

                entity.Property(e => e.TipoUsuario).HasConversion<string>();
                entity.Property(e => e.StatusConta).HasConversion<string>();
                entity.Property(e => e.TipoPessoa).HasConversion<string>();

                // --- INÍCIO DA MODIFICAÇÃO ---
                // Usar a função nativa do PostgreSQL para o valor padrão de data/hora
                entity.Property(e => e.DataCriacao)
                    .HasDefaultValueSql("now() at time zone 'utc'");

                entity.Property(e => e.DataAtualizacao)
                    .HasDefaultValueSql("now() at time zone 'utc'");
                // --- FIM DA MODIFICAÇÃO ---
            });

            // A CHECK CONSTRAINT foi removida daqui.
        }

        public override int SaveChanges()
        {
            UpdateTimestamps();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            UpdateTimestamps();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void UpdateTimestamps()
        {
            var entries = ChangeTracker.Entries<Usuario>()
                .Where(e => e.State == EntityState.Modified);

            foreach (var entry in entries)
            {
                entry.Entity.DataAtualizacao = DateTime.UtcNow;
            }
        }
    }
}