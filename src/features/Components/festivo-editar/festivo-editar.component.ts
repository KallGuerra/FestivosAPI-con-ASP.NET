import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Festivo } from '../../../Shared/Entities/Festivo';
import { Tipo } from '../../../Shared/Entities/Tipo';
import { FormsModule } from '@angular/forms';
import { ReferenciasMaterialModule } from '../../../Shared/Modules/referencias-material.module';
import { CommonModule } from '@angular/common';
import { FestivoService } from '../../../Core/servicios/festivo.service';

export interface DatosEdicionFestivo {
  encabezado: string;
  festivo: Festivo;
  tiposFestivo: Tipo[];
}

@Component({
  selector: 'app-festivo-editar',
  imports: [FormsModule, ReferenciasMaterialModule, CommonModule],
  templateUrl: './festivo-editar.component.html',
  styleUrl: './festivo-editar.component.scss',
})
export class FestivoEditarComponent implements OnInit {
  public festivo: Festivo;
  public tiposFestivo: Tipo[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: DatosEdicionFestivo,
    public ventanaDialogo: MatDialogRef<FestivoEditarComponent>,
    private servicioFestivo: FestivoService
  ) {
    this.festivo = { ...datos.festivo };
    this.tiposFestivo = [...datos.tiposFestivo];

    // Inicializar el tipo si no existe
    if (!this.festivo.idTipo && this.tiposFestivo.length > 0) {
      this.festivo.idTipo = this.tiposFestivo[0].Id;
    }
  }

  ngOnInit() {
    // No necesitamos ExtraerIdTipo() ya que el tipo se maneja directamente
  }

  public validarFormulario(): boolean {
    if (!this.festivo.nombre || this.festivo.nombre.trim() === '') {
      window.alert('El nombre del festivo es requerido');
      return false;
    }
    if (this.festivo.dia < 1 || this.festivo.dia > 31) {
      window.alert('El día debe estar entre 1 y 31');
      return false;
    }
    if (this.festivo.mes < 1 || this.festivo.mes > 12) {
      window.alert('El mes debe estar entre 1 y 12');
      return false;
    }
    // Verificar que idTipo sea un número válido y exista en la lista de tipos
    if (!this.festivo.idTipo ||
        isNaN(Number(this.festivo.idTipo)) ||
        !this.tiposFestivo.some(t => t.Id === this.festivo.idTipo)) {
      window.alert('Debe seleccionar un tipo de festivo válido');
      return false;
    }
    return true;
  }

  public cerrar() {
    if (this.validarFormulario()) {
      console.log('Festivo a enviar:', this.festivo);
      this.ventanaDialogo.close({
        festivo: this.festivo
      });
    }
  }
}
