import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Tipo } from '../../../Shared/Entities/Tipo';
import { ReferenciasMaterialModule } from '../../../Shared/Modules/referencias-material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tipo-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule
  ],
  templateUrl: './tipo-editar.component.html',
  styleUrl: './tipo-editar.component.scss'
})
export class TipoEditarComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: { encabezado: string; tipo: Tipo },
    private dialogRef: MatDialogRef<TipoEditarComponent>
  ) {}

  cerrar() {
    this.dialogRef.close();
  }
}
