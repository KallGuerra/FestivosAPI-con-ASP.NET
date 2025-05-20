import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ReferenciasMaterialModule } from '../../../Shared/Modules/referencias-material.module';
import { Festivo } from '../../../Shared/Entities/Festivo';
import { FestivoService } from '../../../Core/servicios/festivo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-festivo-editar',
  imports: [ReferenciasMaterialModule, ReactiveFormsModule],
  templateUrl: './festivo-editar.component.html',
  styleUrl: './festivo-editar.component.scss'
})
export class FestivoEditarComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FestivoEditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { festivo: Festivo },
    private festivoService: FestivoService
  ) {
    this.form = this.fb.group({
      id: [data.festivo?.Id || 0],
      nombre: [data.festivo?.nombre || '', Validators.required],
      dia: [data.festivo?.dia || 0],
      mes: [data.festivo?.mes || 0],
      diasPascua: [data.festivo?.diasPascua || 0],
      idTipo: [data.festivo?.idTipo || 0, Validators.required]
    });
  }

  guardar(): void {
    const festivo: Festivo = this.form.value;

    const obs = festivo.Id === 0
      ? this.festivoService.agregar(festivo)
      : this.festivoService.modificar(festivo);

    obs.subscribe(() => this.dialogRef.close(true));
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
