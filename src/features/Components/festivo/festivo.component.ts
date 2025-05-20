import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Festivo } from '../../../Shared/Entities/Festivo';
import { FestivoService } from '../../../Core/servicios/festivo.service';
import { TipoService } from '../../../Core/servicios/tipo.service';
import { ReferenciasMaterialModule } from '../../../Shared/Modules/referencias-material.module';
import { FestivoEditarComponent } from '../festivo-editar/festivo-editar.component';
import { DatatableComponent, ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { DecidirComponent } from '../../../Shared/Components/decidir/decidir.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-festivo',
  imports: [
    ReferenciasMaterialModule,
    CommonModule,
    FormsModule,
    NgxDatatableModule
  ],
  templateUrl: './festivo.component.html',
  styleUrl: './festivo.component.scss'
})
export class FestivoComponent implements OnInit, AfterViewInit{

  @ViewChild(DatatableComponent) tabla!: DatatableComponent;
  @ViewChild('actionsTemplate') actionsTemplate: any;
  public readonly TAMANO: number = 10;
  public columnas: any[] = [];

  public opcionBusqueda: number = -1;
  public textoBusqueda: string = '';
  public opcionesBusqueda: string[] = ['Nombre', 'Tipo', 'Mes', 'Dia'];

  public festivos: Festivo[] = [];
  public modoColumna = ColumnMode.force;
  public tipoSeleccion = SelectionType.single;
  public festivoEscogido: Festivo | undefined;
  public indiceFestivoEscogido: number = -1;

  constructor(
    private servicioFestivo: FestivoService,
    private dialogService: MatDialog,
    private servicioTipo: TipoService,
  ) {}

  ngOnInit(): void {
    this.listar(-1);
  }

  ngAfterViewInit() {
    this.columnas = [
      { name: 'Día', prop: 'dia', width: 100 },
      { name: 'Mes', prop: 'mes', width: 80 },
      { name: 'Nombre', prop: 'nombre', width: 200 },
      { name: 'Días Pascua', prop: 'diasPascua', width: 100 },
      { name: 'Tipo', prop: 'idTipo', width: 100 },
    ];
  }

  escoger(event: any) {
    if (event.type == 'click') {
      this.festivoEscogido = event.row;
      this.indiceFestivoEscogido = this.festivos.findIndex(
        (festivo) => festivo == this.festivoEscogido
      );
    }
  }

  public listar(idSeleccionado: number) {
    this.servicioFestivo.listar().subscribe({
      next: (response) => {
        this.festivos = response;
        if (idSeleccionado >= 0) {
          this.indiceFestivoEscogido = this.festivos.findIndex(
            (festivo) => festivo.Id == idSeleccionado
          );
          this.festivoEscogido = this.festivos[this.indiceFestivoEscogido];
          setTimeout(() => {
            this.tabla.offset = Math.floor(
              this.indiceFestivoEscogido / this.TAMANO
            );
          });
        }
      },
      error: (error) => {
        window.alert(error.message);
      },
    });
  }

  public buscar() {
    if (this.textoBusqueda.length == 0) {
      this.listar(-1);
    } else {
      this.servicioFestivo
        .buscar(this.opcionBusqueda, this.textoBusqueda)
        .subscribe({
          next: (response) => {
            this.festivos = response;
          },
          error: (error) => {
            window.alert(error.message);
          },
        });
    }
  }

  public agregar() {
    this.servicioTipo.listar().subscribe({
      next: (tipos) => {
        if (!tipos || tipos.length === 0) {
          window.alert('No hay tipos de festivo disponibles. Por favor, agregue tipos primero.');
          return;
        }
        const dialogRef = this.dialogService.open(FestivoEditarComponent, {
          width: '400px',
          data: {
            encabezado: 'Agregar Festivo',
            festivo: {
              Id: 0,
              nombre: '',
              dia: 1,
              mes: 1,
              diasPascua: 0,
              idTipo: tipos[0].Id
            },
            tiposFestivo: tipos,
            disableClose: true,
          }
        });

        dialogRef.afterClosed().subscribe({
          next: datos => {
            if (datos && datos.festivo) {
              if (!datos.festivo.idTipo && tipos.length > 0) {
                datos.festivo.idTipo = tipos[0].Id;
              }
              this.servicioFestivo.agregar(datos.festivo).subscribe(
                {
                  next: response => {
                    this.listar(response.Id);
                    window.alert('Festivo agregado exitosamente');
                  },
                  error: error => {
                    console.error('Error al agregar festivo:', error);
                    window.alert('Error al agregar el festivo: ' + (error.error?.message || error.message));
                  }
                }
              );
            }
          },
          error: error => {
            console.error('Error en el diálogo:', error);
            window.alert('Error al abrir el formulario: ' + error.message);
          }
        });
      },
      error: error => {
        console.error('Error al cargar tipos:', error);
        window.alert('Error al cargar los tipos de festivo: ' + error.message);
      }
    });
  }

  public modificar(festivo: Festivo) {
    if (festivo) {
      const ventanaModal = this.dialogService.open(FestivoEditarComponent, {
        width: '500px',
        height: '300px',
        data: {
          encabezado: `Editando el Festivo ${festivo.nombre}`,
          festivo: festivo,
        },
        disableClose: true,
      });
      ventanaModal.afterClosed().subscribe({
        next: (datos) => {
          if (datos) {
            this.servicioFestivo.modificar(datos.festivo).subscribe({
              next: (response) => {
                // Find the index of the modified festivo and update it in the local array
                const index = this.festivos.findIndex(f => f.Id === response.Id);
                if (index !== -1) {
                  this.festivos[index] = response;
                  // Manually trigger change detection if needed, though ngx-datatable often handles this
                  this.festivos = [...this.festivos]; // Create new array reference
                }
              },
              error: (error) => {
                window.alert(error.message);
              },
            });
          }
        },
        error: (error) => {
          window.alert(error.message);
        },
      });
    }
  }

  verificarEliminar(id: number): void {
    if (this.festivoEscogido) {
      const ventanaModal = this.dialogService.open(DecidirComponent,
        {
          width: "300px",
          height: "200px",
          data: {
            encabezado: `Está seguro de eliminar la Selección ${this.festivoEscogido.nombre}?`,
            id: this.festivoEscogido.Id
          },
          disableClose: true
        });

      ventanaModal.afterClosed().subscribe({
        next: (resultado) => {
          if (resultado) {
            this.servicioFestivo.eliminar(resultado.id).subscribe({
              next: response => {
                if (response) {
                  this.listar(-1);
                }
                else{
                  window.alert("No se puede eliminar la Selección");
                }
              },
              error: error => {
                window.alert(error.message);
              }
            });
          } else if (resultado === false) {
              console.log('Eliminación cancelada por el usuario');
          }
        },
        error: error => {
          window.alert('Error al cerrar el diálogo: ' + (error.error?.message || error.message));
        }
      });
    }
    else {
      window.alert("Debe escoger alguna de las selecciones listadas");
    }
  }

}
