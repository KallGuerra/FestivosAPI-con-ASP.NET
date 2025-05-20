import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReferenciasMaterialModule } from '../../../Shared/Modules/referencias-material.module';
import { TipoService } from '../../../Core/servicios/tipo.service';
import { MatDialog } from '@angular/material/dialog';
import { Tipo } from '../../../Shared/Entities/Tipo';
import { TipoEditarComponent } from '../tipo-editar/tipo-editar.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tipo',
  imports: [
    CommonModule,
    ReferenciasMaterialModule,
    FormsModule,
    MatTableModule,
    RouterModule,
  ],
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.scss'
})
export class TipoComponent implements OnInit {

  tipos: Tipo[] = [];
  columnas: string[] = ['id', 'nombre', 'acciones'];

  constructor(private servicio: TipoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.servicio.listar().subscribe({
      next: data => (this.tipos = data),
      error: err => alert('Error al listar: ' + err.message),
    });
  }

  agregar() {
    const dialogRef = this.dialog.open(TipoEditarComponent, {
      width: '400px',
      data: {
        encabezado: 'Agregar Tipo',
        tipo: { id: 0, nombre: '' },
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(tipo => {
      if (tipo) {
        this.servicio.agregar(tipo).subscribe(() => this.listar());
      }
    });
  }

  editar(tipo: Tipo) {
    const copia = { ...tipo };
    const dialogRef = this.dialog.open(TipoEditarComponent, {
      width: '400px',
      data: {
        encabezado: 'Editar Tipo',
        tipo: copia,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(t => {
      if (t) {
        this.servicio.modificar(t).subscribe(() => this.listar());
      }
    });
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar este tipo?')) {
      this.servicio.eliminar(id).subscribe(() => this.listar());
    }
  }

}
