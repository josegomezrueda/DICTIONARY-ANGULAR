import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './auth/infrastructure/presentation/login-component/login-component.component';
import { EspRoutingRoutingModule } from './shared/infrastructure/esp-routing/esp-routing-routing.module';
import { RegisterComponent } from './auth/infrastructure/presentation/register/register.component';
import { AuthguardGuard } from './auth/authguard/authguard.guard';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => EspRoutingRoutingModule,
        canActivate:[AuthguardGuard]
      },
      {
        path: 'login',
        component: LoginComponentComponent
      },
      {
        path: 'registro',
        component: RegisterComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
