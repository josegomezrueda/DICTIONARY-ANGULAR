import { Component, Input, OnInit } from '@angular/core';
import { PalabraEsp } from 'src/app/gestion/domain/palabra-esp';
import { EspanolSimpleOutputDto, PalabraIng } from 'src/app/gestion/domain/palabra-ing';

@Component({
  selector: 'app-fila-tabla-ingles',
  templateUrl: './fila-tabla-ingles.component.html',
  styleUrls: ['./fila-tabla-ingles.component.scss']
})
export class FilaTablaInglesComponent implements OnInit {


  public palabra: string;
  public palabraEsp: EspanolSimpleOutputDto;
  public descripcion: string;
  public palabraCont: PalabraIng;

  @Input() filaPalabraIng: PalabraIng;


  constructor() { }

  ngOnInit(): void {

    this.palabra = this.filaPalabraIng.palabra;
    this.descripcion = this.filaPalabraIng.descripcion;
    this.palabraCont = this.filaPalabraIng
    this.palabraEsp=this.filaPalabraIng.espanolSimpleOutputDto;
  

  }
}
