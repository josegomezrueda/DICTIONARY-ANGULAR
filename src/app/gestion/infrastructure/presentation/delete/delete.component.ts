
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PalabraEsp } from 'src/app/gestion/domain/palabra-esp';

import { IdiomaService } from '../../services/idioma.service';
import { MessageToastService } from '../../services/message-toast.service';
import { ServicioPalabrasService } from '../../services/servicio-palabras.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit, OnDestroy {
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ocultar: boolean = false;
  palabra: string;
  lenguaje: string;
  palabraMod: string;
  palabras: string[] = [];
  titulo: string;
  idiomaSubscribe: Subscription;
  palabraId: string;
  borrar: string;
  crear: string;



  constructor(
    private formBuilder: FormBuilder,
    private readonly idioma: IdiomaService,
    private readonly palabrasService: ServicioPalabrasService,
    private readonly messageToastService: MessageToastService
  ) {
    this.idiomaSubscribe = this.idioma.idiomaUpdated.subscribe((value: string) => {
      if (value === 'esp') {
        this.lenguaje = 'esp';
        this.palabrasEspanol()
        this.cogerParametros(value);

      } else {
        this.lenguaje = 'en';
        this.palabrasIngles()
        this.cogerParametros(value);

      }
    })
  }
  ngOnInit(): void {
    if (localStorage.getItem('idioma') === 'esp') {
      this.lenguaje = 'esp';
      this.palabrasEspanol()
      this.cogerParametros(localStorage.getItem('idioma') || '')

    } else {
      this.lenguaje = 'en';
      this.palabrasIngles()
      this.cogerParametros(localStorage.getItem('idioma') || '')
    }
  }

  ngOnDestroy(): void {
    this.idiomaSubscribe.unsubscribe();
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

  borrarValor(palabra: string) {
    if (localStorage.getItem('idioma') === 'esp') {
      this.palabrasService.cargarPalabraEsp(palabra).subscribe(palabraEscogida => {
        this.palabrasService.borrarPalabraEsp(palabraEscogida.palabra).subscribe(respuesta => {
          this.messageToastService.showToastSuccess('Borrar Palabra', 'La palabra se ha borrado correctamente')
        },
        error => {
          if (error = 404) {
            this.messageToastService.showToastError('ERROR', 'No has seleccionado palabra')
          } else {
            this.messageToastService.showToastError('ERROR', error)
          }
        })
      },
        error => {
          if (error = 400) {
            this.messageToastService.showToastError('ERROR', 'La palabra que se quiere eliminar no existe en el diccionario')
          } else {
            this.messageToastService.showToastError('ERROR', error)
          }
        })
    } else {
      this.palabrasService.cargarPalabraIng(palabra).subscribe(palabraEscogida => {
        this.palabrasService.borrarPalabraIng(palabraEscogida.palabra).subscribe(respuesta => {
          this.messageToastService.showToastSuccess('Borrar Palabra', 'La palabra se ha borrado correctamente')
        },
        error => {
          if (error = 404) {
            this.messageToastService.showToastError('ERROR', 'There is not word Selected')
          } else {
            this.messageToastService.showToastError('ERROR', error)
          }
        } 
        )
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

  public palabrasEspanol() {
    this.palabraMod = 'Palabra';
    this.titulo = 'BORRAR';
    this.borrar = 'Borrar';
  }
  public palabrasIngles() {
    this.palabraMod = 'Word';
    this.titulo = 'DELETE';
    this.borrar = 'delete';
  }
}
