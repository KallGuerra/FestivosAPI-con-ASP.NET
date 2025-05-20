import { Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, DatePipe} from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
// angular Material
import { ReferenciasMaterialModule } from '../../../Shared/Modules/referencias-material.module';

// importacion de entidades y servicios
import { Festivo } from '../../../Shared/Entities/Festivo';
import { FestivoService } from '../../../Core/servicios/festivo.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule , ReferenciasMaterialModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'

})
export class HomeComponent {
  year: number = new Date().getFullYear();

  constructor(private dialog: MatDialog) {}




}
