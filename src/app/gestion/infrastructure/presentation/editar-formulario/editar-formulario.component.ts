import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PalabraEsp } from 'src/app/gestion/domain/palabra-esp';
import { PalabraIng } from 'src/app/gestion/domain/palabra-ing';

import { IdiomaService } from '../../services/idioma.service';
import { MessageToastService } from '../../services/message-toast.service';
import { ServicioPalabrasService } from '../../services/servicio-palabras.service';

@Component({
  selector: 'app-editar-formulario',
  templateUrl: './editar-formulario.component.html',
  styleUrls: ['./editar-formulario.component.scss']
})
export class EditarFormularioComponent implements OnInit, OnDestroy {
  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  ocultar: boolean = false;
  palabra: string;
  lenguaje: string;
  palabraMod: string;
  palabras: string[] = [];
  titulo: string;
  titulo2: string;
  titulo3: string;
  idiomaSubscribe: Subscription;
  FormPalabra: FormGroup;
  palabraId: string;

  constructor(
    private formBuilder: FormBuilder,
    private readonly idioma: IdiomaService,
    private readonly palabrasService: ServicioPalabrasService,
    private readonly messageToastService: MessageToastService
  ) {
    this.idiomaSubscribe = this.idioma.idiomaUpdated.subscribe((value: string) => {
      this.escogerForm(value);
      if (value === 'esp') {
        this.lenguaje = 'esp';
        this.palabrasEspanol();
        this.cogerParametros(value);
      } else {
        this.lenguaje = 'en';
        this.palabrasIngles();
        this.cogerParametros(value);

      }
    })
  }
  ngOnInit(): void {
    this.escogerForm(localStorage.getItem('idioma') || '')
    if (localStorage.getItem('idioma') === 'esp') {
      this.lenguaje = 'esp';
      this.palabrasEspanol();
      this.cogerParametros(localStorage.getItem('idioma') || '')

    } else {
      this.lenguaje = 'en';
      this.palabrasIngles();
      this.cogerParametros(localStorage.getItem('idioma') || '')
    }
  }

  ngOnDestroy(): void {
    this.idiomaSubscribe.unsubscribe();
  }

  escogerForm(idioma: string) {
    if (idioma === 'esp') {
      this.ocultar = true;
      this.FormPalabra = this.formBuilder.group({
        palabra: ['', [Validators.required]],
        descripcion: ['', [Validators.required]]
      })
    } else {
      this.ocultar = false;
      this.FormPalabra = this.formBuilder.group({
        palabra: ['', [Validators.required]],
        palabraEspanol: ['', [Validators.required]]
      })
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
  
  buscarPalabra(palabra: string) {
    if (localStorage.getItem('idioma') === 'esp') {
      this.palabrasService.cargarPalabraEsp(palabra).subscribe(respuesta => {
        this.FormPalabra.patchValue(respuesta);

      },
      error => {
        if (error = 400) {
          this.messageToastService.showToastError('ERROR', 'La palabra introducida no existe en el diccionario')
          this.escogerForm(localStorage.getItem('idioma')||'')
        } else {
          this.messageToastService.showToastError('ERROR', error)
          this.escogerForm(localStorage.getItem('idioma')||'')
        }

      })
    } else {
      this.palabrasService.cargarPalabraIng(palabra).subscribe(respuesta => {
        this.FormPalabra.patchValue(respuesta);

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
  
  actualizarValor(){
        
    if(localStorage.getItem('idioma')==='esp'){
      let palabraEsp: PalabraEsp = this.FormPalabra.value;
      this.palabrasService.editarPalabraEsp(palabraEsp).subscribe(respuesta=>{
        this.messageToastService.showToastSuccess('Editar Palabra', 'La palabra se ha editado correctamente')
      },
      error => {
        if (error = 404) {
          this.messageToastService.showToastError('ERROR', 'No es posible editar la palabra seleccionada')
        } else {
          this.messageToastService.showToastError('ERROR', error)
        }
      })
      
    }else{
      let palabraIng: PalabraIng = this.FormPalabra.value;
      this.palabrasService.editarPalabraIng(palabraIng).subscribe(respuesta=>{
        this.messageToastService.showToastSuccess('Edit Word', 'Word is updated correctly')
      },
      error => {
        if (error = 404) {
          this.messageToastService.showToastError('ERROR', 'It is not possible edit this word')
        } else {
          this.messageToastService.showToastError('ERROR', error)
        }
      })
    }
  }

  public palabrasEspanol(){
    this.palabraMod = 'Escoge palabra';
    this.titulo = 'EDITAR';
    this.titulo2='Escoge palabra para autocompletar campos siguientes';
    this.titulo3='Editar campos';
  }
  public palabrasIngles(){
    this.palabraMod = 'Choose word';
    this.titulo = 'EDIT';
    this.titulo2='Choose word to autocomplete following fields';
    this.titulo3='Edit fields';
  }
  public isValid() {
    return this.FormPalabra.invalid;
  }

}
