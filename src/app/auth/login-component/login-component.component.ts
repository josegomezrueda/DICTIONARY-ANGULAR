import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/domain/user.interface';
import { AuthService } from 'src/app/shared/infrastructure/services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss']
})
export class LoginComponentComponent implements OnInit {
  usuario : User;
  FormLogin = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private authService: AuthService, private formBuilder: FormBuilder,private router: Router) { }

  
  ngOnInit(): void {
  }

  functionLogin(){
    this.usuario=this.FormLogin.value;
    this.authService.login(this.usuario.username,this.usuario.password)
    if (localStorage.getItem('logeado')==='t'){
      this.router.navigate(['/'])
    }
    
  }

  public isValid() {
    return this.FormLogin.invalid;
  }
}
