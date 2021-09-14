import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/domain/user.interface';
import { MessageToastService } from 'src/app/shared/infrastructure/services/message-toast.service';
import { UsuariosService } from 'src/app/shared/infrastructure/services/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly usuariosService: UsuariosService, 
    private router: Router,
    private readonly messageToastService: MessageToastService) { }

  listaPersona: any[] = [];
  usuario: any = '';

  createUsuario(username: string, password: string) {
    console.log(username,'pet1')
    let user: User = { username, password }
    this.usuariosService.cargarUsuarioUsername(username).subscribe((resp) => {
      console.log(resp)
      if (resp.length!==0) {
        this.messageToastService.showToastError('ERROR', 'El username que desea introducir ya existe')
      } else {
        this.usuariosService.crearUsuario(user).subscribe(() => {
          this.messageToastService.showToastSuccess('IMPORTANTE', 'El usuario ha sido creado correctamente')
          this.router.navigate(['/'])
        })
      }
    })
  }

  login(username: string, password: string): void {

    this.usuariosService.cargarUsuarioUsername(username).subscribe((resp) => {
      if (resp.length!==0) {
        this.usuariosService.cargarUsuarioPassword(password).subscribe((resp) => {
          if(resp.length!==0){
            localStorage.setItem('logeado', 't')
            this.messageToastService.showToastSuccess('IMPORTANTE', 'El login ha sido realizado correctamente')
            this.router.navigate(['/'])
          }else{
            localStorage.setItem('logeado', 'f')
            this.messageToastService.showToastError('IMPORTANTE', 'El usuario o la contraseña son incorrectos')
            this.router.navigate(['/registro'])
          }
        })
      } else {
        localStorage.setItem('logeado', 'f')
        this.messageToastService.showToastError('IMPORTANTE', 'El usuario o la contraseña son incorrectos')
        this.router.navigate(['/registro'])
      }
    })
  }
}

