import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../Environments/Environment';
import { Festivo } from '../../../Shared/Entities/Festivo';

@Injectable({
  providedIn: 'root'
})
export class FestivoService {

  private url: string;


  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}festivo/`;
   }

   public listar(): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}listar`);
  }

  public buscar(opcion: number, dato: string): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}buscar/${opcion}/${dato}`);
  }

  public agregar(Festivo: Festivo): Observable<Festivo> {
    return this.http.post<Festivo>(`${this.url}agregar`, Festivo);
  }

  public modificar(Festivo: Festivo): Observable<Festivo> {
    return this.http.put<Festivo>(`${this.url}modificar`, Festivo);
  }

}
