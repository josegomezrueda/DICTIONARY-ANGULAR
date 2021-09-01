import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PalabraEsp } from '../../../domain/palabra-esp';
import { PalabraIng } from '../../../domain/palabra-ing';



import { MuestraDatosComponent } from '../muestra-datos/muestra-datos.component';
import { IdiomaService } from '../../services/idioma.service';
import { ServicioPalabrasService } from '../../services/servicio-palabras.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  titulo: string;
  buscador: string;
  mostrar: string;
  buscar:string;

  tipoAccion: string = '';

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private readonly idioma: IdiomaService,
    private readonly palabrasService: ServicioPalabrasService
  ) {
    this.idioma.idiomaUpdated.subscribe((value: string) => {
      if (value === 'esp') {
        this.palabrasEspanol()
      } else {
        this.palabrasIngles()
      }
    })
  }

  idForm = this.formBuilder.group({
    id: ['', [Validators.required]]
  })

  showFiller = false;
  ngOnInit(): void {
    if (localStorage.getItem('idioma') === 'esp') {
      this.palabrasEspanol()
    } else {
      this.palabrasIngles()
    }
  }


  mostrarPalabras(): void {

    if (localStorage.getItem('idioma') === 'esp') {

      this.palabrasService.cargarPalabrasEsp().subscribe((palabrasRec: PalabraEsp[]) => {
        this.tipoAccion = 'mostrarTodo';
        const dialogEditEs = this.dialog.open(MuestraDatosComponent, {
          width: 'auto',
          height: '700px',
          data: { palabrasRec, tipoAccion: this.tipoAccion }
        });
      })
    } else if (localStorage.getItem('idioma') === 'en') {

      this.palabrasService.cargarPalabrasIng().subscribe((palabrasRec: PalabraIng[]) => {
        this.tipoAccion = 'mostrarTodo';
        const dialogEditEs = this.dialog.open(MuestraDatosComponent, {
          width: 'auto',
          height: '700px',
          data: { palabrasRec, tipoAccion: this.tipoAccion }
        });
      })
    }
  }

  buscarId() {
    let palabra: string = this.idForm.value.id;
    if (localStorage.getItem('idioma') === 'esp') {
      this.palabrasService.cargarPalabraEsp(palabra).subscribe(respuesta => {
        this.tipoAccion = 'mostrarUno';
        const dialogEditEs = this.dialog.open(MuestraDatosComponent, {
          width: 'auto',
          height: 'auto',
          data: { respuesta, tipoAccion: this.tipoAccion }
        });
      },
        err => { console.log(err) })
    } else if (localStorage.getItem('idioma') === 'en') {
      this.palabrasService.cargarPalabraIng(palabra).subscribe(respuesta => {
        this.tipoAccion = 'mostrarUno';
        const dialogEditEs = this.dialog.open(MuestraDatosComponent, {
          width: 'auto',
          height: 'auto',
          data: { respuesta, tipoAccion: this.tipoAccion }
        });
      },
        err => { console.log(err) })
    }
  }

  public palabrasEspanol(){
    this.buscador = 'Buscador';
    this.titulo = 'DICCIONARIO';
    this.mostrar = 'Mostrar todo';
    this.buscar = 'Buscar';
  }
  public palabrasIngles(){
    this.buscador = 'Search';
    this.titulo = 'DICTIONARY';
    this.mostrar = 'Show all';
    this.buscar = 'Search';
  }

  public isValid() {
    return this.idForm.invalid;
  }
}
