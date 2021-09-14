import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioPalabrasComponent } from '../presentation/formulario-palabras/formulario-palabras.component';
import { PaginaInicioComponent } from '../presentation/pagina-inicio/pagina-inicio.component';
import { EditarFormularioComponent } from '../presentation/editar-formulario/editar-formulario.component';
import { DeleteComponent } from '../presentation/delete/delete.component';
import { LoginComponentComponent } from 'src/app/auth/login-component/login-component.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaInicioComponent
  },
  {
    path: 'crear',
    component: FormularioPalabrasComponent
  },
  {
    path: 'editar',
    component: EditarFormularioComponent
  },
  {
    path: 'editar/:palabra',
    component: EditarFormularioComponent
  },
  {
    path: 'borrar/:palabra',
    component: DeleteComponent
  },
  {
    path: 'borrar',
    component: DeleteComponent
  },
  {
    path: 'login',
    component: LoginComponentComponent
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspRoutingRoutingModule { }
