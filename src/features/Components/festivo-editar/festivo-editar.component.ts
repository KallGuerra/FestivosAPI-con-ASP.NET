import { id } from '@swimlane/ngx-datatable';
import { Component, Inject, OnInit } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../Shared/Modules/referencias-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Festivo } from '../../../Shared/Entities/Festivo';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tipo } from '../../../Shared/Entities/Tipo';
import { NgFor } from '@angular/common';
import { TipoService } from '../../../Core/servicios/tipo.service';
import { MatSelectChange } from '@angular/material/select';

export interface DatosEdicionFestivo {
  encabezado: string;
  festivo: Festivo;
  tipo: Tipo[];
}

@Component({
  selector: 'app-festivo-editar',
  imports: [ReferenciasMaterialModule, FormsModule, ReactiveFormsModule, NgFor],
  templateUrl: './festivo-editar.component.html',
  styleUrl: './festivo-editar.component.scss',
})
export class FestivoEditarComponent implements OnInit {
  tipoSeleccionado: Tipo | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: DatosEdicionFestivo,
    private ventanaDialogo: MatDialogRef<FestivoEditarComponent>,
    private tipoService: TipoService
  ) {}

  ngOnInit(): void {
    this.cargarTipos();
  }

  public cargarTipos(): void {
    this.tipoService.listar().subscribe({
      next: (tipos) => {
        this.datos.tipo = tipos;
        // Solo establecer el tipo inicial si no hay uno seleccionado
        /* if (!this.datos.festivo.idTipo && tipos.length > 0) {
          this.datos.festivo.idTipo = tipos[0].Id;
          this.datos.festivo.tipo = tipos[0];
        } */
      },
      error: (error) => {
        window.alert(`Error al cargar tipos: ${error.message}`);
      },
    });
  }

  public seleccionarTipo(event: MatSelectChange): void {
    const tipoSeleccionado = event.value as Tipo;

    if (tipoSeleccionado) {
      this.datos.festivo.tipo = tipoSeleccionado;
      this.datos.festivo.idTipo = tipoSeleccionado.id;
    } else {
      window.alert('Tipo no encontrado');
    }
  }

  public cerrar() {
    this.ventanaDialogo.close(this.datos);
  }
}
