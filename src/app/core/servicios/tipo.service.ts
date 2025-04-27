import { Tipo } from '../../../Shared/Entities/Tipo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../Environments/Environment';


@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}tipos/`;
   }

  public listar(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.url}listar`);
  }

  public buscar(opcion: number, dato: string): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.url}buscar/${opcion}/${dato}`);
  }

  public agregar(Tipo: Tipo): Observable<Tipo> {
    return this.http.post<Tipo>(`${this.url}agregar`, Tipo);
  }

  public modificar(Tipo: Tipo): Observable<Tipo> {
    return this.http.put<Tipo>(`${this.url}modificar`, Tipo);
  }
}
