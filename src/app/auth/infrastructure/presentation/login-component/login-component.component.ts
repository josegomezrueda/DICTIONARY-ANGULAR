import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/domain/user.interface';
import { AuthService } from 'src/app/auth/infrastructure/services/auth.service';
import { IdiomaService } from 'src/app/shared/infrastructure/services/idioma.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit, OnDestroy {
  usuario: User;
  idiomaSubscribe: Subscription;
  titulo:string;
  registro:string;
  user:string;
  password:string;

  FormLogin = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(
    private readonly idioma: IdiomaService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router) {
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
  functionLogin() {
    this.usuario = this.FormLogin.value;
    this.authService.login(this.usuario.username, this.usuario.password)
    if (localStorage.getItem('logeado') === 't') {
      this.router.navigate(['/'])
    } else {
      this.router.navigate(['/registro'])
    }
  }
  public palabrasEspanol() {
    this.titulo='INTRODUCE USUARIO Y CONTRASEÑA PARA UTILIZAR LA APLICACIÓN';
    this.registro='Registrarse';
    this.user='usuario';
    this.password='contraseña';
  }
  public palabrasIngles() {
    this.titulo='ENTER USER AND PASSWORD TO USE THE APPS';
    this.registro='Register';
    this.user='user';
    this.password='password';
  }
  public isValid() {
    return this.FormLogin.invalid;
  }
}
