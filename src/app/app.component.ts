import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from '../Shared/Modules/referencias-material.module';
import { HomeComponent } from '../features/Components/home/home.component';


@Component({
  selector: 'app-root',
  imports: [ ReferenciasMaterialModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProFestivos';
  public year: number = new Date().getFullYear();

}

