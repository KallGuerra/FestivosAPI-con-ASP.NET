import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environments/Environment';
import { Festivo } from '../../Shared/Entities/Festivo';
import { FestivoCalculadoDto } from '../../Shared/Entities/verificarDto'

@Injectable({
  providedIn: 'root'
})
export class FestivoService {

  private url: string;


  constructor(private http: HttpClient) {
    this.url = `${environment.urlService}festivos/`;
   }

   public listar(): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}listar`);
  }

  public buscar(opcion: number, dato: string): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}buscar/${opcion}/${dato}`);
  }

  public agregar(Festivo: Festivo): Observable<Festivo> {
    return this.http.post<Festivo>(`${this.url}agregar`, Festivo)
  }

  public modificar(Festivo: Festivo): Observable<Festivo> {
    return this.http.put<Festivo>(`${this.url}modificar`, Festivo);
  }

  public eliminar(idFestivo: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${idFestivo}`);
  }

  public festivosPorAnio(anio: number): Observable<FestivoCalculadoDto[]> {
    return this.http.get<FestivoCalculadoDto[]>(`${this.url}festivosPorAno/${anio}`);
  }

  public esFestivo(dia: number, mes: number, anio: number): Observable<FestivoCalculadoDto> {
    return this.http.get<FestivoCalculadoDto>(`${this.url}esFestivo/${dia}/${mes}/${anio}`);
  }

}
