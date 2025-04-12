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
            // 1. Consultamos las reglas desde la BD
            var reglas = await repositorio.ObtenerReglasAsync();

            // 2. Calculamos la fecha de Pascua del año dado
            DateTime pascua = CalcularPascua(fecha.Year);

            foreach (var regla in reglas)
            {
                DateTime? fechaRegla = null;

                switch (regla.Tipo)
                {
                    case 1: // Fecha fija
                        fechaRegla = new DateTime(fecha.Year, regla.Mes!.Value, regla.Dia!.Value);
                        break;

                    case 2: // Puente: se traslada al lunes siguiente
                        fechaRegla = ObtenerLunesSiguiente(new DateTime(fecha.Year, regla.Mes!.Value, regla.Dia!.Value));
                        break;

                    case 3: // Relacionado con Pascua
                        fechaRegla = pascua.AddDays(regla.DiasDesdePascua!.Value);
                        break;

                    case 4: // Pascua + traslado al lunes
                        fechaRegla = ObtenerLunesSiguiente(pascua.AddDays(regla.DiasDesdePascua!.Value));
                        break;

                    default:
                        continue;
                }

                if (fecha.Date == fechaRegla?.Date)
                    return true;
            }

            // 3. Consulta directa a la tabla de fechas (si existen también en `Festivos`)
            return await repositorio.EsFestiva(fecha);
        }

        private DateTime ObtenerLunesSiguiente(DateTime fecha)
        {
            int diasHastaLunes = ((int)DayOfWeek.Monday - (int)fecha.DayOfWeek + 7) % 7;
            return fecha.AddDays(diasHastaLunes == 0 ? 7 : diasHastaLunes);
        }

        private DateTime CalcularPascua(int anio)
        {
            // Algoritmo de Meeus/Jones/Butcher para calcular Pascua
            int a = anio % 19;
            int b = anio / 100;
            int c = anio % 100;
            int d = b / 4;
            int e = b % 4;
            int f = (b + 8) / 25;
            int g = (b - f + 1) / 3;
            int h = (19 * a + b - d - g + 15) % 30;
            int i = c / 4;
            int k = c % 4;
            int l = (32 + 2 * e + 2 * i - h - k) % 7;
            int m = (a + 11 * h + 22 * l) / 451;
            int mes = (h + l - 7 * m + 114) / 31;
            int dia = ((h + l - 7 * m + 114) % 31) + 1;
            return new DateTime(anio, mes, dia);
        }

    }
}
