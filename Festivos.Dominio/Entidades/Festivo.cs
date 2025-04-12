
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;


namespace Festivos.Dominio.Entidades
{
        [Table("Festivo")]
        public class Festivo
        {
            [Key]
            public int Id { get; set; }

            [Column("Fecha")]
            public DateTime Fecha { get; set; }

            [Column("Descripcion"), StringLength(200)]
            public string? Descripcion { get; set; }
        }
}
