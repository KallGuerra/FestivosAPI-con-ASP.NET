import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenciasMaterialModule } from '../../../Shared/Modules/referencias-material.module';

@Component({
  selector: 'app-tipo',
  imports: [CommonModule, ReferenciasMaterialModule],
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.scss'
})
export class TipoComponent {

}
