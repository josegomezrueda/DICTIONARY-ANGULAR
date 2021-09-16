import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PalabraEsp } from 'src/app/gestion/esp/domain/palabra-esp';
import { PalabraIng } from 'src/app/gestion/ing/domain/palabra-ing';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioPalabrasService {

  url=environment.Url

  constructor(private http: HttpClient) { }
 
  cargarPalabrasEsp(): Observable<PalabraEsp[]> {
    const url = this.url+'espanol';
    return this.http.get<PalabraEsp[]>(url);
  }

  cargarPalabraEsp(id:string|null): Observable<PalabraEsp> {
    const url = this.url+'espanol/'+id;
    return this.http.get<PalabraEsp>(url);
  }
  cargarPalabrasIng(): Observable<PalabraIng[]> {
    const url = this.url+'ingles';
    return this.http.get<PalabraIng[]>(url);
  }

  cargarPalabraIng(id:string|null): Observable<PalabraIng> {
    const url = this.url+'ingles/'+id;
    return this.http.get<PalabraIng>(url);
  }

  crearPalabrasEsp(palabra:PalabraEsp): Observable<PalabraEsp> {
    const url = this.url+'espanol';
    return this.http.post<PalabraEsp>(url, palabra)}

  crearPalabrasIng(palabra:PalabraIng): Observable<PalabraIng> {
    const url = this.url+'ingles';
    return this.http.post<PalabraIng>(url, palabra);
  }

  editarPalabraEsp(palabra:PalabraEsp): Observable<PalabraEsp> {
    const url = this.url+'espanol/'+palabra.palabra;
    return this.http.put<PalabraEsp>(url, palabra);
  }

  editarPalabraIng(palabra:PalabraIng): Observable<PalabraIng> {
    const url = this.url+'ingles/'+palabra.palabra;
    return this.http.put<PalabraIng>(url, palabra);
  }

  borrarPalabraEsp(palabra:string): Observable<PalabraEsp> {
    const url = this.url+'espanol/'+palabra;
    return this.http.delete<PalabraEsp>(url);
  }

  borrarPalabraIng(palabra:string): Observable<PalabraIng> {
    const url = this.url+'ingles/'+palabra;
    return this.http.delete<PalabraIng>(url);
  }
}