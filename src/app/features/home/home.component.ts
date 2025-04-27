import { Component , OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeDialogComponent } from '../home-dialog/home-dialog.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  year: number = new Date().getFullYear();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(HomeDialogComponent, {
      width: '400px',
      disableClose: true,
    });
  }
}
