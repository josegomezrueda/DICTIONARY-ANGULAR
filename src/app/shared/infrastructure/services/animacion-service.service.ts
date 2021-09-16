import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimacionServiceService {
  animacionUpdated: EventEmitter<boolean> = new EventEmitter<boolean>();
  animacion:boolean=false;
  constructor() { }

  seleccionAnimacion(): void {
    this.animacion=!this.animacion
    console.log('animacionActivada'+this.animacion)
    this.animacionUpdated.emit(this.animacion)
    setTimeout(()=>{
      this.animacion=!this.animacion
    console.log('animacionActivada'+this.animacion)
      this.animacionUpdated.emit(this.animacion)
    },3000)
    
  }
}