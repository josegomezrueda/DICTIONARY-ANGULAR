import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  listaPersona= [{ id: 1, username: 'Jose', password: '123' }, { id: 2, username: 'Alejandro', password: '123' }]

  login(username: string, password: string): void {
    for (let i = 0; i < this.listaPersona.length; i++) {
      if (this.listaPersona[i].username == username && this.listaPersona[i].password == password) {
        localStorage.setItem('logeado','t')
        break   
      }else{
        localStorage.setItem('logeado','f')
        break
      }
    }
  }
}

