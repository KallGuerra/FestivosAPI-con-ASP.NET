using Festivos.Dominio.Entidades;
using Microsoft.EntityFrameworkCore;



namespace Festivos.Infraestructura.Persistencia.Contexto
{
    public class FestivosContext : DbContext
    {
        public FestivosContext(DbContextOptions<FestivosContext> options) : base(options)
        {
        }

        public DbSet<Festivo> Festivos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuración adicional (índices, claves, etc.) si se necesita.
            modelBuilder.Entity<Festivo>().HasKey(f => f.Id);
            modelBuilder.Entity<Festivo>().HasIndex(f => f.Fecha).IsUnique();
        }
    }
}
