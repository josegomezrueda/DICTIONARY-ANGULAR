import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PalabraEsp } from 'src/app/gestion/domain/palabra-esp';
import { PalabraIng } from 'src/app/gestion/domain/palabra-ing';


@Component({
  selector: 'app-fila-tabla',
  templateUrl: './fila-tabla.component.html',
  styleUrls: ['./fila-tabla.component.scss']
})
export class FilaTablaComponent implements OnInit {


  public palabra: string;
  public palabrasIng: PalabraIng[];
  public descripcion: string;
  public palabraCont: PalabraEsp;



  @Input() filaPalabraEsp: PalabraEsp;


  constructor() { }

  ngOnInit(): void {


    this.palabra = this.filaPalabraEsp.palabra ;
    this.descripcion = this.filaPalabraEsp.descripcion;
    this.palabraCont = this.filaPalabraEsp
    this.palabrasIng=this.filaPalabraEsp.palabrasIngles || [];

  }

}