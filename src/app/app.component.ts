import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from '../Shared/Modules/referencias-material.module';
import { HomeComponent } from './features/home/home.component';


@Component({
  selector: 'app-root',
  imports: [ ReferenciasMaterialModule, HomeComponent],
  template: `
    <app-home></app-home> <!-- muestra Home -->
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProFestivos';
}
