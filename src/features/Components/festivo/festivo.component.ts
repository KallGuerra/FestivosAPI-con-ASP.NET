import { Festivo } from './../../../Shared/Entities/Festivo';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../Shared/Modules/referencias-material.module';
import { FormsModule, NgControlStatusGroup} from '@angular/forms';
import { ColumnMode, DatatableComponent, id, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FestivoService } from '../../../Core/servicios/festivo.service';
import { MatDialog } from '@angular/material/dialog';
import { Tipo } from '../../../Shared/Entities/Tipo';
import { TipoService } from '../../../Core/servicios/tipo.service';
import { NgFor } from '@angular/common';
import { DecidirComponent } from '../../../Shared/Components/decidir/decidir.component';
import { RouterModule } from '@angular/router';
import { FestivoEditarComponent } from '../festivo-editar/festivo-editar.component';



@Component({
  selector: 'app-festivo',
  imports: [ReferenciasMaterialModule, FormsModule, NgxDatatableModule, NgFor],
  templateUrl: './festivo.component.html',
  styleUrl: './festivo.component.scss'
})
export class FestivoComponent implements OnInit {
  @ViewChild(DatatableComponent) tabla!: DatatableComponent;
  public readonly TAMANO: number = 10;

  public opcionBusqueda: number = -1;
  public textoBusqueda: string= "";
  public opcionesBusqueda: string[] = ["Nombre","Tipo","Mes","Dia"];

  public festivos: Festivo[] = [];
  public tipo: Tipo[] = [];
  public columnas = [
    { name: "Dia", prop: "dia" },
    { name: "Mes", prop: "mes" },
    { name: "Nombre", prop: "nombre" },
    { name: "Dias de pascua", prop: "diasPascua"},
    { name: "Tipo", prop: "tipo.nombre"},
  ];

  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public festivoEscogido: Festivo | undefined;
  public indiceFestivoEscogido: number = -1;

  constructor(
    private servicioFestivo: FestivoService,
    private servicioTipo: TipoService,
    private dialogService: MatDialog
  ){}

  ngOnInit(): void {
      this.listar(-1);
      this.listarTipos();
  }



  public listar(idSeleccionado: number){
    this.servicioFestivo.listar().subscribe({
      next: Response => {
        this.festivos = Response;
        if (idSeleccionado >= 0) {
          this.indiceFestivoEscogido = this.festivos.findIndex( festivos => festivos.Id == idSeleccionado);
          this.festivoEscogido = this.festivos[this.indiceFestivoEscogido];
          setTimeout(() => {
            this.tabla.offset = Math.floor(this.indiceFestivoEscogido / this.TAMANO);
          })
        }
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }

  public buscar(): void {
    if (this.textoBusqueda.length == 0){
      this.listar(-1);
    }
    else{
      this.servicioFestivo.buscar(this.opcionBusqueda, this.textoBusqueda).subscribe({
        next: response => {
          this.festivos = response;
        },
        error: error => {
          window.alert(error.message);
        }
      });
    }
  }

  public agregar() {
    const ventanaModal = this.dialogService.open(FestivoEditarComponent, {
      width: "500px",
      height: "400px",
      data: {
        encabezado: "Agregando un nuevo festivo",
        festivo: {
          id: 0,
          dia: 0,
          mes: 0,
          nombre: '',
          diasPascua: 0,
          idTipo: 0,
          tipo: {
            Id: 0,
            nombre: ''
          }
        },
        tipos: this.tipo
      },
      disableClose: true
    });

    ventanaModal.afterClosed().subscribe({
      next: (datos: { festivo: Festivo }) => {
        if (datos) {
          // Validar datos antes de enviar
          if (!datos.festivo.nombre || datos.festivo.dia <= 0 || datos.festivo.mes <= 0) {
            window.alert("Por favor complete todos los campos requeridos");
            return;
          }

          console.log('Datos a enviar:', JSON.stringify(datos.festivo, null, 2));

          this.servicioFestivo.agregar(datos.festivo).subscribe({
            next: (response: Festivo) => {
              this.listar(response.Id);
              window.alert("Festivo agregado exitosamente");
            },
            error: (error) => {
              window.alert(`Error al agregar festivo: ${error.message}`);
            }
          });
        }
      },
      error: (error) => {
        window.alert(`Error al procesar el formulario: ${error.message}`);
      }
    });
  }



  public modificar(): void {

  }

  public verificarEliminar(): void {

  }

  private eliminar(): void {

  }

  escoger(event: any) {
    if (event.type === 'click') {
      this.festivoEscogido = event.row;
      this.indiceFestivoEscogido = this.festivos.findIndex(festivo => festivo === this.festivoEscogido);
    }
  }

  public listarTipos() {
    this.servicioTipo.listar().subscribe({
      next: response => {
        this.tipo = response;
      },
      error: error => {
        window.alert(error.message);
      }
    });
  }












}
