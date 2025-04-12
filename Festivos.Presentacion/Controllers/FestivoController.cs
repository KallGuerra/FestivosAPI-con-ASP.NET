using Festivos.Aplicacion.Servicios;
using Festivos.Core.Servicios;
using Microsoft.AspNetCore.Mvc;

namespace Festivos.Presentacion.Controllers
{
    [ApiController]
    [Route("api/festivos")]
    public class FestivoController : ControllerBase
    {
        private readonly IFestivoServicio festivoServicio;

        public FestivoController(IFestivoServicio festivoServicio)
        {
            this.festivoServicio = festivoServicio;
        }

        /// <summary>
        /// Valida si una fecha es festiva.
        /// Ejemplo de llamado: GET api/festivos/esfestiva/2025-12-25
        /// </summary>
        /// <param name="fecha">Fecha en formato ISO (yyyy-MM-dd)</param>
        /// <returns>JSON indicando si es festiva o no</returns>
        [HttpGet("esfestiva/{fecha}")]
        public async Task<IActionResult> EsFestiva(string fecha)
        {
            if (!DateTime.TryParse(fecha, out DateTime fechaConvertida))
            {
                return BadRequest("Formato de fecha inválido. Utilice yyyy-MM-dd.");
            }

            bool esFestiva = await festivoServicio.EsFestiva(fechaConvertida);
            return Ok(new { Fecha = fechaConvertida.ToString("yyyy-MM-dd"), EsFestiva = esFestiva });
        }

        [HttpGet("es-festivo")]
        public async Task<IActionResult> EsFestivo([FromQuery] DateTime fecha)
        {
            bool esFestivo = await festivoServicio.EsFestiva(fecha);
            return Ok(new { fecha = fecha.ToString("yyyy-MM-dd"), esFestivo });
        }
    }
}
