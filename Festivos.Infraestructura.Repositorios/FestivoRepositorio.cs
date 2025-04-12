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
            // 1. Revisión de festivos fijos
            bool esFijo = await context.Festivos.AnyAsync(f => f.Fecha.Date == fecha.Date);
            if (esFijo) return true;

            // 2. Obtener todas las reglas
            var reglas = await context.FestivoReglas.ToListAsync();
            var pascua = CalcularPascua(fecha.Year);

            foreach (var regla in reglas)
            {
                DateTime fechaRegla;

                switch (regla.Tipo)
                {
                    case 2: // Puente: se traslada al lunes siguiente
                        if (regla.Mes.HasValue && regla.Dia.HasValue)
                        {
                            var fechaBase = new DateTime(fecha.Year, regla.Mes.Value, regla.Dia.Value);
                            fechaRegla = ObtenerLunesSiguiente(fechaBase);
                        }
                        else continue;
                        break;

                    case 3: // Relacionado con Pascua
                        if (regla.DiasDesdePascua.HasValue)
                        {
                            fechaRegla = pascua.AddDays(regla.DiasDesdePascua.Value);
                        }
                        else continue;
                        break;

                    case 4: // Pascua + traslado al lunes
                        if (regla.DiasDesdePascua.HasValue)
                        {
                            var temp = pascua.AddDays(regla.DiasDesdePascua.Value);
                            fechaRegla = ObtenerLunesSiguiente(temp);
                        }
                        else continue;
                        break;

                    default:
                        continue;
                }


                if (fecha.Date == fechaRegla.Date)
                    return true;
            }

            return false;
        }

        private DateTime ObtenerLunesSiguiente(DateTime fecha)
        {
            int diasAdelante = ((int)DayOfWeek.Monday - (int)fecha.DayOfWeek + 7) % 7;
            return fecha.AddDays(diasAdelante == 0 ? 7 : diasAdelante);
        }

        private DateTime CalcularPascua(int año)
        {
            int a = año % 19;
            int b = año / 100;
            int c = año % 100;
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

            return new DateTime(año, mes, dia);
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

        public async Task<IEnumerable<FestivoRegla>> ObtenerReglasAsync()
        {
            return await context.FestivoReglas.ToListAsync();
        }
    }
}
