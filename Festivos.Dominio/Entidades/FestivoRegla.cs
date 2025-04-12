
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Festivos.Dominio.Entidades
{
    [Table("FestivoRegla")]
    public class FestivoRegla
    {
        [Key]
        public int Id { get; set; }

        [Column("Nombre")]
        public string Nombre { get; set; } = string.Empty;

        [Column("Mes")]
        public int? Mes { get; set; }

        [Column("Dia")]
        public int? Dia { get; set; }

        [Column("Tipo")]
        public int Tipo { get; set; }

        [Column("DiasDesdePascua")]
        public int? DiasDesdePascua { get; set; }
    }
}
