
import { Component, Inject,  } from '@angular/core';
import { ReferenciasMaterialModule } from '../../Modules/referencias-material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DatosDecision {
  encabezado: string;
  id: number;
}

@Component({
  selector: 'app-decidir',
  imports: [ReferenciasMaterialModule],
  templateUrl: './decidir.component.html',
  styleUrl: './decidir.component.scss'
})
export class DecidirComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosDecision,
    private ventanaDialogo: MatDialogRef<DecidirComponent>) {

  }

  public cerrar() {
    this.ventanaDialogo.close();
  }

}
