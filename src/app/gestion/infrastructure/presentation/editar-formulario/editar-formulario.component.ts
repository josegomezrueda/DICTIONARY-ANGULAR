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
      if (value === 'esp') {
        this.lenguaje = 'esp';
        this.palabrasEspanol();
        this.cogerParametros(value);
        this.escogerForm(value);

      } else {
        this.lenguaje = 'en';
        this.palabrasIngles();
        this.cogerParametros(value);
        this.escogerForm(value);

      }
    })
  }
  ngOnInit(): void {
    if (localStorage.getItem('idioma') === 'esp') {
      this.lenguaje = 'esp';
      this.palabrasEspanol();
      this.cogerParametros(localStorage.getItem('idioma') || '')
      this.escogerForm(localStorage.getItem('idioma') || '')

    } else {
      this.lenguaje = 'en';
      this.palabrasIngles();
      this.cogerParametros(localStorage.getItem('idioma') || '')
      this.escogerForm(localStorage.getItem('idioma') || '')

    }
  }

  ngOnDestroy(): void {
    this.idiomaSubscribe.unsubscribe();
  }

  escogerForm(idioma: string) {
    if (idioma === 'esp') {
      this.ocultar = true;
      this.FormPalabra = this.formBuilder.group({
        descripcion: ['', [Validators.required]],
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

  getPosts(event: string) {
    this.palabraId=event;
    if (localStorage.getItem('idioma') === 'esp') {
      this.palabrasService.cargarPalabraEsp(event).subscribe(respuesta => {
        this.FormPalabra.patchValue(respuesta);
      })
    } else {
      this.palabrasService.cargarPalabraIng(event).subscribe(respuesta => {
        this.FormPalabra.patchValue(respuesta);
      })
    }
  }

  actualizarValor(){
        
    if(localStorage.getItem('idioma')==='esp'){
      let palabraEsp: PalabraEsp = this.FormPalabra.value;
      palabraEsp.palabra=this.palabraId
      this.palabrasService.editarPalabraEsp(palabraEsp).subscribe(respuesta=>{
        this.messageToastService.showToastSuccess('Editar Palabra', 'La palabra se ha editado correctamente')
      })
      
    }else{
      let palabraIng: PalabraIng = this.FormPalabra.value;
      palabraIng.palabra=this.palabraId
      this.palabrasService.editarPalabraIng(palabraIng).subscribe(respuesta=>{
        this.messageToastService.showToastSuccess('Edit Word', 'Word is updated correctly')
      })
    }
  }

  public palabrasEspanol(){
    this.palabraMod = 'Escoge palabra';
    this.titulo = 'EDITAR';
  }
  public palabrasIngles(){
    this.palabraMod = 'Choose word';
    this.titulo = 'EDIT';
  }
  public isValid() {
    return this.FormPalabra.invalid;
  }

}
