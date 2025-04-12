using Festivos.Aplicacion.Servicios;
using Festivos.Core.Repositorios;
using Festivos.Core.Servicios;
using Festivos.Infraestructura.Persistencia.Contexto;
using Festivos.Infraestructura.Repositorios;
using Microsoft.EntityFrameworkCore;


namespace Festivos.Presentacion.DI
{
    public static class InyeccionDependencias
    {
        public static IServiceCollection AgregarDependencias(this IServiceCollection servicios, IConfiguration configuracion)
        {
            servicios.AddDbContext<FestivosContext>(opciones =>
            {
                opciones.UseSqlServer(configuracion.GetConnectionString("FestivosConnection"));
            });

            // Repositorios
            servicios.AddTransient<IFestivoRepositorio, FestivoRepositorio>();

            // Servicios
            servicios.AddTransient<IFestivoServicio, FestivoServicio>();

            return servicios;
        }
    }
}
