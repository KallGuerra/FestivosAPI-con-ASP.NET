using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Festivos.Core.Servicios
{
    public interface IFestivoServicio
    {
        /// <summary>
        /// Valida si la fecha especificada es festiva.
        /// </summary>
        /// <param name="fecha">Fecha a validar</param>
        /// <returns>true si es festiva; false en caso contrario</returns>
        Task<bool> EsFestiva(DateTime fecha);
    }
}
