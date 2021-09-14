import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PalabraEsp } from 'src/app/gestion/esp/domain/palabra-esp';
import { EspanolSimpleOutputDto, PalabraIng } from 'src/app/gestion/ing/domain/palabra-ing';
import { BuscadorComponent } from 'src/app/shared/infrastructure/presentation/buscador/buscador.component';

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


  constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
  public dialogEditEs: MatDialogRef<BuscadorComponent>,
  private router: Router
  ) { }

  ngOnInit(): void {

    this.palabra = this.filaPalabraIng.palabra;
    this.descripcion = this.filaPalabraIng.descripcion;
    this.palabraCont = this.filaPalabraIng
    this.palabraEsp=this.filaPalabraIng.espanolSimpleOutputDto;
  

  }
  onEditar(){
    this.router.navigate(['/editar/'+this.filaPalabraIng.palabra])
    console.log(this.filaPalabraIng.palabra)
    this.dialogEditEs.close();
  }

  onBorrar(){
    this.router.navigate(['/borrar/'+this.filaPalabraIng.palabra])
    this.dialogEditEs.close();
  }
}
