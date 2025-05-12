import { Routes } from '@angular/router';
import { HomeComponent } from '../features/Components/home/home.component';
import { FestivoComponent } from '../features/Components/festivo/festivo.component';
import { TipoComponent } from '../features/Components/tipo/tipo.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'festivos', component: FestivoComponent },
  { path: 'tipos', component: TipoComponent },

];
