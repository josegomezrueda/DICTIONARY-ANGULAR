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
  public palabraTraducida: string='';
  public palabrasTraducidas:PalabraIng[]=[];
  public idioma: string='';

  @Input() filaPalabra: any;
  constructor() { }

  ngOnInit(): void {
    this.id=this.filaPalabra.id;
    this.palabra=this.filaPalabra.palabra;
    this.descripcion=this.filaPalabra.descripcion;

    if (localStorage.getItem('idioma')=='esp'){
      this.idioma='esp'
      this.tituloPalabra='Palabra';
      this.traduccion='Traudcción al inglés';
      this.definicion='Definición';
      this.palabrasTraducidas=this.filaPalabra.palabrasIngles
     
    }else{
      this.idioma='en'
      this.tituloPalabra='Word';
      this.traduccion='Translate to spanish';
      this.definicion='Definition';
      this.palabraTraducida=this.filaPalabra.espanolSimpleOutputDto.palabra
    }
  }
}