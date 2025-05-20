import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReferenciasMaterialModule } from '../../Modules/referencias-material.module';

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public datos: any,
    private dialogRef: MatDialogRef<DecidirComponent>
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }


}
