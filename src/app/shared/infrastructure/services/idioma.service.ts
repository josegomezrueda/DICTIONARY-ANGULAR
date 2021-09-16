import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  idiomaUpdated: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    console.log(localStorage.getItem('idioma'))

  }
  seleccionIdioma(idiomaRec: string): void {

    if (idiomaRec === 'esp') {
      this.idiomaUpdated.emit(idiomaRec)
      localStorage.setItem('idioma', 'esp');

    } else {
      this.idiomaUpdated.emit(idiomaRec)
      localStorage.setItem('idioma', 'en');

    }
  }
}
