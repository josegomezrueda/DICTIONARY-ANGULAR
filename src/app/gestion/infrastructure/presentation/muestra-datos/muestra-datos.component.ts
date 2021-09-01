import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PalabraEsp } from '../../../domain/palabra-esp';
import { PalabraIng } from '../../../domain/palabra-ing';

import { BuscadorComponent } from '../buscador/buscador.component';
import { ServicioPalabrasService } from '../../services/servicio-palabras.service';




@Component({
  selector: 'app-muestra-datos',
  templateUrl: './muestra-datos.component.html',
  styleUrls: ['./muestra-datos.component.scss']
})
export class MuestraDatosComponent implements OnInit {

  datosIng: PalabraIng[];
  datosEsp: PalabraEsp[];
  idioma:string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogEditEs: MatDialogRef<BuscadorComponent>) { }


  
  ngOnInit(): void {
    this.getIdioma();
  }
  cerrarVentana() {
    this.dialogEditEs.close();
  }

  getIdioma(){
    if (localStorage.getItem('idioma')==='esp'){
      this.idioma='esp';
      if (this.data.tipoAccion==='mostrarTodo'){
        this.datosEsp = this.data.palabrasRec;
      }else{
        this.datosEsp = this.data.respuesta;
      }
      
    }else if(localStorage.getItem('idioma')==='en'){
      this.idioma='en';
      if (this.data.tipoAccion==='mostrarTodo'){
        this.datosIng = this.data.palabrasRec;
      }else{
        this.datosIng = this.data.respuesta;
      }
    }
  }
}