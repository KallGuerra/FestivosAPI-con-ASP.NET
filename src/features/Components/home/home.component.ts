import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReferenciasMaterialModule } from '../../../Shared/Modules/referencias-material.module';


@Component({
  selector: 'app-home',
  imports: [CommonModule, ReferenciasMaterialModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  year: number = new Date().getFullYear();

  constructor(private dialog: MatDialog) {}




}
