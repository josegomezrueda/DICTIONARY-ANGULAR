import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PalabraEsp } from 'src/app/gestion/esp/domain/palabra-esp';
import { PalabraIng } from 'src/app/gestion/ing/domain/palabra-ing';
import { IdiomaService } from '../../services/idioma.service';
import { MessageToastService } from '../../services/message-toast.service';
import { ServicioPalabrasService } from '../../services/servicio-palabras.service';

@Component({
  selector: 'app-formulario-palabras',
  templateUrl: './formulario-palabras.component.html',
  styleUrls: ['./formulario-palabras.component.scss']
})
export class FormularioPalabrasComponent implements OnInit {

  palabraEsp: PalabraEsp;
  palabraIng: PalabraIng;
  palabra: string;
  titulo: string;
  descripcion: string;
  crear: string;
  FormPalabra: FormGroup;
  ocultar: boolean;
  idiomaSubscribe: Subscription;

  constructor(
    private readonly messageToastService: MessageToastService,
    private formBuilder: FormBuilder,
    private readonly idioma: IdiomaService,
    private readonly palabrasService: ServicioPalabrasService,
    private router: Router
  ) {
    this.idiomaSubscribe = this.idioma.idiomaUpdated.subscribe((value: string) => {
      this.escogerForm(value);
      if (value === 'esp') {
        this.palabrasEspanol();
      } else {
        this.palabrasIngles();
      }
    })
  }


  ngOnInit(): void {
    this.escogerForm(localStorage.getItem('idioma') || '');
    if (localStorage.getItem('idioma') === 'esp') {
      this.palabrasEspanol();

    } else {
      this.palabrasIngles();
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
  public crearDatos() {
    if (localStorage.getItem('idioma') === 'esp') {
      this.palabraEsp = this.FormPalabra.value;
      console.log(this.palabraEsp)
      this.palabrasService.crearPalabrasEsp(this.palabraEsp).subscribe(response => {
        this.messageToastService.showToastSuccess('Crear Palabra', 'La palabra se ha creado correctamente')
      },
      error => {
        if (error == 409) {
          this.messageToastService.showToastError('ERROR', 'La palabra ya existe')
        } else {
          this.messageToastService.showToastError('ERROR', error)
        }
      })
    } else {
      this.palabraIng = this.FormPalabra.value;
      console.log(this.palabraIng)
      this.palabrasService.crearPalabrasIng(this.palabraIng).subscribe(response => {
        this.messageToastService.showToastSuccess('Create Word', 'Word is saved correctly')
      },
      error => {
        if (error == 409) {
          this.messageToastService.showToastError('ERROR', 'Word exits')
        } else {
          this.messageToastService.showToastError('ERROR', error)
        }
      })
    }
  }

  functionLogout(){
    localStorage.removeItem('logeado');
    this.router.navigate(['/login'])
  }
  
  public palabrasEspanol() {
    this.crear = 'Crear';
    this.palabra = 'palabra';
    this.descripcion = 'descripción';
    this.titulo = 'CREAR';
  }
  public palabrasIngles() {
    this.crear = 'Create';
    this.palabra = 'word';
    this.descripcion = 'description'
    this.titulo = 'CREATE';
  }

  public isValid() {
    return this.FormPalabra.invalid;
  }
}
