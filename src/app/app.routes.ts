import { Routes } from '@angular/router';
import { HomeComponent } from '../features/Components/home/home.component';
import { TipoComponent } from '../features/Components/tipo/tipo.component';
import { VerificarFestivosComponent } from '../features/Components/verificar-festivos/verificar-festivos.component';
import { FestivoComponent } from '../features/Components/festivo/festivo.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'gestionTipos', component: TipoComponent},
  { path: 'verificarFestivos', component: VerificarFestivosComponent},
  { path: 'festivo', component: FestivoComponent},

];
