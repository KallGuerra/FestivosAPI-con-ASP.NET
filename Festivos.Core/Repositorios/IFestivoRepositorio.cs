using Festivos.Dominio.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Festivos.Core.Repositorios
{
    public interface IFestivoRepositorio
    {
        /// <summary>
        /// Retorna verdadero si la fecha existe en los festivos registrados.
        /// </summary>
        /// <param name="fecha">Fecha a validar</param>
        /// <returns></returns>
        Task<bool> EsFestiva(DateTime fecha);

        // Opcional: métodos para agregar o listar festivos.
        Task<Festivo> Agregar(Festivo festivo);
        Task<IEnumerable<Festivo>> ObtenerTodos();
        Task<IEnumerable<FestivoRegla>> ObtenerReglasAsync();

    }
}
