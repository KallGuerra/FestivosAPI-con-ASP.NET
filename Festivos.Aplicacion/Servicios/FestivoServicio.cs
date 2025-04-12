using Festivos.Core.Repositorios;
using Festivos.Core.Servicios;


namespace Festivos.Aplicacion.Servicios
{
    public class FestivoServicio : IFestivoServicio
    {
        private readonly IFestivoRepositorio repositorio;

        public FestivoServicio(IFestivoRepositorio repositorio)
        {
            this.repositorio = repositorio;
        }

        public async Task<bool> EsFestiva(DateTime fecha)
        {
            // Aquí podrías agregar reglas adicionales (por ejemplo, si el día es fin de semana)
            return await repositorio.EsFestiva(fecha);
        }
    }
}
