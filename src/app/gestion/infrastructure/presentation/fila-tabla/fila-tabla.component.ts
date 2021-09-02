import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PalabraEsp } from '../../../domain/palabra-esp';
import { PalabraIng } from '../../../domain/palabra-ing';



@Component({
  selector: 'app-fila-tabla',
  templateUrl: './fila-tabla.component.html',
  styleUrls: ['./fila-tabla.component.scss']
})
export class FilaTablaComponent implements OnInit {
  public id: number=0;
  public palabra: string="";
  public tituloPalabra: string='';
  public descripcion: string='';
  public traduccion: string='';
  public definicion: string='';
  public palabrasEsp:PalabraEsp[]=[];
  public palabrasIng:PalabraIng[]=[];
  public palabraEsp:PalabraEsp;
  public palabraIng:PalabraIng;
  public idioma: string='';
  public fechaAlta: string='';
  public fechaModificacion: string='';
  public fechaModificacionDate: boolean;


  @Input() filaPalabra: any;
  constructor() { }

  ngOnInit(): void {
    this.id=this.filaPalabra.id;
    this.palabra=this.filaPalabra.palabra;
    this.descripcion=this.filaPalabra.descripcion;
    if(this.filaPalabra.fechaModificacion!==null){
      this.fechaModificacionDate=true
    }else{
      this.fechaModificacionDate=false
    }
    if (localStorage.getItem('idioma')=='esp'){
      this.idioma='esp'
      this.tituloPalabra='Palabra';
      this.traduccion='Traducción al inglés';
      this.definicion='Definición';
      this.fechaAlta='Fecha Alta';
      this.fechaModificacion='Fecha Modificación';
      this.palabrasEsp=this.filaPalabra.palabrasIngles
      this.palabraEsp=this.filaPalabra

    }else{
      this.idioma='en';
      this.tituloPalabra='Word';
      this.traduccion='Translate to spanish';
      this.definicion='Definition';
      this.fechaAlta='Create date';
      this.fechaModificacion='Modification date';
      this.palabrasIng=this.filaPalabra.espanolSimpleOutputDto.palabra;
      this.palabraIng=this.filaPalabra;
    }

  }
}