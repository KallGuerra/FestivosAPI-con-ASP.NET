using Festivos.Core.Repositorios;
using Festivos.Dominio.Entidades;
using Festivos.Infraestructura.Persistencia.Contexto;
using Microsoft.EntityFrameworkCore;

namespace Festivos.Infraestructura.Repositorios
{
    public class FestivoRepositorio : IFestivoRepositorio
    {
        private readonly FestivosContext context;

        public FestivoRepositorio(FestivosContext context)
        {
            this.context = context;
        }

        public async Task<bool> EsFestiva(DateTime fecha)
        {
            // Se asume que la fecha almacenada en la BD está sin componente de hora.
            return await context.Festivos.AnyAsync(f => f.Fecha.Date == fecha.Date);
        }

        public async Task<Festivo> Agregar(Festivo festivo)
        {
            context.Festivos.Add(festivo);
            await context.SaveChangesAsync();
            return festivo;
        }

        public async Task<IEnumerable<Festivo>> ObtenerTodos()
        {
            return await context.Festivos.ToListAsync();
        }
    }
}
