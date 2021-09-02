import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PalabraEsp } from '../../../domain/palabra-esp';
import { PalabraIng } from '../../../domain/palabra-ing';



import { MuestraDatosComponent } from '../muestra-datos/muestra-datos.component';
import { IdiomaService } from '../../services/idioma.service';
import { ServicioPalabrasService } from '../../services/servicio-palabras.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MessageToastService } from '../../services/message-toast.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {
  myControl = new FormControl();

  filteredOptions: Observable<string[]>;

  titulo: string;
  titulo2: string;
  titulo3: string;
  buscador: string;
  mostrar: string;
  buscar: string;
  palabras: string[] = [];
  palabraId: string;
  palabraMod: string;
  palabraEsp: PalabraEsp;
  palabraIng: PalabraIng;

  tipoAccion: string = '';

  constructor(
    public dialog: MatDialog,
    private readonly idioma: IdiomaService,
    private readonly palabrasService: ServicioPalabrasService,
    private readonly messageToastService: MessageToastService
  ) {
    this.idioma.idiomaUpdated.subscribe((value: string) => {
      if (value === 'esp') {
        this.palabrasEspanol()
        this.cogerParametros(value);
      } else {
        this.palabrasIngles()
        this.cogerParametros(value);
      }
    })
  }

  showFiller = false;
  ngOnInit(): void {
    if (localStorage.getItem('idioma') === 'esp') {
      this.cogerParametros(localStorage.getItem('idioma') || '')
      this.palabrasEspanol()
    } else {
      this.cogerParametros(localStorage.getItem('idioma') || '')
      this.palabrasIngles()
    }
  }

  cogerParametros(idioma: string) {

    if (idioma === 'esp') {
      this.palabrasService.cargarPalabrasEsp().subscribe(resolve => {
        this.palabras = [];
        for (let i = 0; i < resolve.length; i++) {
          this.palabras.push(resolve[i].palabra);
        }
        this.cargarDatos();
      })
    } else {
      this.palabrasService.cargarPalabrasIng().subscribe(resolve => {
        this.palabras = [];
        for (let i = 0; i < resolve.length; i++) {
          this.palabras.push(resolve[i].palabra);
        }
        this.cargarDatos();
      })
    }
  }

  cargarDatos() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.palabras.filter(option => option.toLowerCase().includes(filterValue));
  }

  buscarId(palabraRecibida: string) {
    if (palabraRecibida === '') {
      this.messageToastService.showToastError('IMPORTANTE', 'Debes indtroducir una palabra')
    }else{
      this.tipoAccion = 'mostrarUno';
      if (localStorage.getItem('idioma') === 'esp') {
        this.palabrasService.cargarPalabraEsp(palabraRecibida).subscribe(
          respuesta => {
            this.palabraEsp = respuesta;
            const dialogEditEs = this.dialog.open(MuestraDatosComponent, {
              width: 'auto',
              height: 'auto',
              data: { palabraEsp: this.palabraEsp, tipoAccion: this.tipoAccion }
            });
          },
          error => {
            if (error = 400) {
              this.messageToastService.showToastError('ERROR', 'La palabra introducida no existe en el diccionario')
            } else {
              this.messageToastService.showToastError('ERROR', error)
            }
          })
      } else {
        this.palabrasService.cargarPalabraIng(palabraRecibida).subscribe(respuesta => {
          this.palabraIng = respuesta;
          const dialogEditEs = this.dialog.open(MuestraDatosComponent, {
            width: 'auto',
            height: 'auto',
            data: { palabraIng: this.palabraIng, tipoAccion: this.tipoAccion }
          });
        },
          error => {
            if (error = 400) {
              this.messageToastService.showToastError('ERROR', 'Word does not exist in dictionary')
            } else {
              this.messageToastService.showToastError('ERROR', error)
            }
          })
      }
    }
  }


  mostrarPalabras(): void {

    if (localStorage.getItem('idioma') === 'esp') {

      this.palabrasService.cargarPalabrasEsp().subscribe((palabrasRec: PalabraEsp[]) => {
        this.tipoAccion = 'mostrarTodo';
        const dialogEditEs = this.dialog.open(MuestraDatosComponent, {
          width: '1200px',
          height: '800px',
          data: { palabrasRec, tipoAccion: this.tipoAccion }
        });
      },
        error => { this.messageToastService.showToastError('ERROR', error) }
      )

    } else if (localStorage.getItem('idioma') === 'en') {

      this.palabrasService.cargarPalabrasIng().subscribe((palabrasRec: PalabraIng[]) => {
        this.tipoAccion = 'mostrarTodo';
        const dialogEditEs = this.dialog.open(MuestraDatosComponent, {
          width: '1200px',
          height: '800px',
          data: { palabrasRec, tipoAccion: this.tipoAccion }
        });
      },
        error => { this.messageToastService.showToastError('ERROR', error) })
    }
  }
  public palabrasEspanol() {
    this.buscador = 'Buscador';
    this.titulo = 'DICCIONARIO';
    this.mostrar = 'Mostrar todo';
    this.buscar = 'Buscar';
    this.palabraMod = 'Palabra';
    this.titulo2='Buscar por palabra';
    this.titulo3='Buscar todo';
  }
  public palabrasIngles() {
    this.buscador = 'Search';
    this.titulo = 'DICTIONARY';
    this.mostrar = 'Show all';
    this.buscar = 'Search';
    this.palabraMod = 'Word';
    this.titulo2='Search for word';
    this.titulo3='Search all';
  }
}
