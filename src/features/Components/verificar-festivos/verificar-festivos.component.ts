import { Component } from '@angular/core';
import { FestivoService } from '../../../Core/servicios/festivo.service';
import { FestivoCalculadoDto } from '../../../Shared/Entities/verificarDto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReferenciasMaterialModule } from '../../../Shared/Modules/referencias-material.module';

@Component({
  selector: 'app-verificar-festivos',
  imports: [
    CommonModule,
    FormsModule,
    ReferenciasMaterialModule
  ],
  templateUrl: './verificar-festivos.component.html',
  styleUrl: './verificar-festivos.component.scss'
})
export class VerificarFestivosComponent {
  anio = new Date().getFullYear();
  dia = 1;
  mes = 1;
  anioVerificacion = new Date().getFullYear();
  busquedaAnioRealizada = false;
  verificacionRealizada = false;
  fechaVerificada: FestivoCalculadoDto | null = null;
  festivosAnio: FestivoCalculadoDto[] = [];

  constructor(private festivoService: FestivoService) {}

  obtenerFestivosPorAnio() {
    this.busquedaAnioRealizada = true;
    this.festivoService.festivosPorAnio(this.anio).subscribe({
      next: (data: FestivoCalculadoDto[]) => this.festivosAnio = data,
      error: () => alert('Error al obtener festivos')
    });
  }

  verificarFestivo() {
    this.verificacionRealizada = true;
    this.festivoService.esFestivo(this.dia, this.mes, this.anioVerificacion).subscribe({
      next: (data: FestivoCalculadoDto) => this.fechaVerificada = data,
      error: () => this.fechaVerificada = null
    });
  }
}
