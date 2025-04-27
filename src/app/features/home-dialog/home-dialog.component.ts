import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-dialog',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './home-dialog.component.html',
  styleUrl: './home-dialog.component.scss'
})
export class HomeDialogComponent {

  constructor(private dialogRef: MatDialogRef<HomeDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }
}
