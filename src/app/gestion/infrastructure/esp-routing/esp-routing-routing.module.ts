import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioPalabrasComponent } from '../presentation/formulario-palabras/formulario-palabras.component';
import { PaginaInicioComponent } from '../presentation/pagina-inicio/pagina-inicio.component';
import { AplicacionResolver } from 'src/app/gestion/infrastructure/resolvers/resolver';
import { EditarFormularioComponent } from '../presentation/editar-formulario/editar-formulario.component';
import { DeleteComponent } from '../presentation/delete/delete.component';

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
    path: 'borrar',
    component: DeleteComponent
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspRoutingRoutingModule { }
