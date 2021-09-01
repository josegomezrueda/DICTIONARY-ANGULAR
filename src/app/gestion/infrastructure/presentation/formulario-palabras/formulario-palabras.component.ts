import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PalabraEsp } from 'src/app/gestion/domain/palabra-esp';
import { PalabraIng } from 'src/app/gestion/domain/palabra-ing';
import { IdiomaService } from '../../services/idioma.service';
import { MessageToastService } from '../../services/message-toast.service';
import { ServicioPalabrasService } from '../../services/servicio-palabras.service';

@Component({
  selector: 'app-formulario-palabras',
  templateUrl: './formulario-palabras.component.html',
  styleUrls: ['./formulario-palabras.component.scss']
})
export class FormularioPalabrasComponent implements OnInit {

  lenguaje: string = '';
  palabraEsp: PalabraEsp;
  palabraIng: PalabraIng;
  palabra: string;
  titulo: string;
  descripcion: string;
  crear:string;
  FormPalabra = this.formBuilder.group({
    palabra: ['', [Validators.required]],
    descripcion: ['', [Validators.required]]
  })

  constructor(
    private readonly messageToastService: MessageToastService,
    private formBuilder: FormBuilder,
    private readonly idioma: IdiomaService,
    private readonly palabrasService: ServicioPalabrasService
  ) {
    this.idioma.idiomaUpdated.subscribe((value: string) => {
      if (value === 'esp') {
        this.lenguaje='esp';
        this.palabrasEspanol()
      }else{
        this.lenguaje='en'
        this.palabrasIngles()
      }
    })
  }

  ngOnInit(): void {
    if (localStorage.getItem('idioma') === 'esp') {
      this.lenguaje='esp';
      this.palabrasEspanol();
    }else{
      this.lenguaje='en'
      this.palabrasIngles()
    }
  }

  public crearDatos() {
    if(this.lenguaje='esp'){
      this.palabraEsp=this.FormPalabra.value;
      this.palabrasService.crearPalabrasEsp(this.palabraEsp).subscribe(response=>{
        this.messageToastService.showToastSuccess('Crear Palabra', 'La palabra se ha creado correctamente')

      })
    }else{
      this.palabraIng=this.FormPalabra.value;
      this.palabrasService.crearPalabrasIng(this.palabraIng).subscribe(response=>{
        this.messageToastService.showToastSuccess('Create Word', 'Word is saved correctly')
      })
    }
  }
  public palabrasEspanol(){
    this.crear = 'Crear';
    this.palabra='palabra';
    this.descripcion='descripción';
    this.titulo='CREAR';
  }
  public palabrasIngles(){
    this.crear = 'Create';
    this.palabra='word';
    this.descripcion='description'
    this.titulo='CREATE';
  }
  
   public isValid() {
    return this.FormPalabra.invalid;
  }
}
