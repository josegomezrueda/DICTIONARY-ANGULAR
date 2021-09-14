import { Inject, Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PalabraEsp } from 'src/app/gestion/esp/domain/palabra-esp';
import { PalabraIng } from 'src/app/gestion/ing/domain/palabra-ing';
import { BuscadorComponent } from 'src/app/shared/infrastructure/presentation/buscador/buscador.component';


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


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogEditEs: MatDialogRef<BuscadorComponent>,
  private router: Router) { }

  ngOnInit(): void {


    this.palabra = this.filaPalabraEsp.palabra ;
    this.descripcion = this.filaPalabraEsp.descripcion;
    this.palabraCont = this.filaPalabraEsp
    this.palabrasIng=this.filaPalabraEsp.palabrasIngles || [];

  }
  onEditar(){
    this.router.navigate(['/editar/'+this.filaPalabraEsp.palabra])
    console.log(this.filaPalabraEsp.palabra)
    this.dialogEditEs.close();
  }

  onBorrar(){
    this.router.navigate(['/borrar/'+this.filaPalabraEsp.palabra])
    this.dialogEditEs.close();
  }
}