import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../domain/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  urlUsuario=environment.UrlUsuario

  constructor(private http: HttpClient) { }

  crearUsuario(usuario: User): Observable<User> {
    const url = this.urlUsuario+'usuario';
    return this.http.post<User>(url, usuario);
  }

  borrarUsuario(usuario:string): Observable<User> {
    const url = this.urlUsuario+'usuario/'+usuario;
    return this.http.delete<User>(url);
  }
  cargarUsuarioUsername(usuario:string): Observable<Array<User>> {
    const url = this.urlUsuario+'usuario?username='+usuario;
    return this.http.get<Array<User>>(url);
  }
  cargarUsuarioPassword(usuario:string): Observable<Array<User>> {
    const url = this.urlUsuario+'usuario?password='+usuario;
    return this.http.get<Array<User>>(url);
  }

}