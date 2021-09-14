import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IdiomaService } from 'src/app/shared/infrastructure/services/idioma.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  idiomaSubscribe: Subscription;
  volver:string;
  titulo:string;
  user:string;
  password:string;
  crear:string;
  formRegister= this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private readonly idioma: IdiomaService) {
      this.idiomaSubscribe = this.idioma.idiomaUpdated.subscribe((value: string) => {
        if (value === 'esp') {
          this.palabrasEspanol()
        } else {
          this.palabrasIngles()
        }
      })
     }

  ngOnInit(): void {
    if (localStorage.getItem('idioma') === 'esp') {
      this.palabrasEspanol()
    } else {
      this.palabrasIngles()
    }
  }
  ngOnDestroy(): void {
    this.idiomaSubscribe.unsubscribe();
  }
  public palabrasEspanol() {
    this.volver='volver'
    this.titulo='Crear usuario'
    this.user='usuario';
    this.password='contraseña';
    this.crear='Crear';
  }
  public palabrasIngles() {
    this.volver='return';
    this.titulo='create user';
    this.user='user';
    this.password='password';
    this.crear='Create';

  }
  public isValid() {
    return this.formRegister.invalid;
  }

  crearUsuario() {
    let username=this.formRegister.get('username')?.value;
    let password=this.formRegister.get('password')?.value;
    this.authService.createUsuario(username,password)
  }
}
