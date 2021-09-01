import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspRoutingRoutingModule } from './gestion/infrastructure/esp-routing/esp-routing-routing.module';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => EspRoutingRoutingModule
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
