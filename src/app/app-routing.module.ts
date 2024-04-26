import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdministradorComponent } from './administrador/administrador.component';
import { NavComponent } from './nav/nav.component';
import { EmpleadosComponent } from './empleados/empleados.component';


const routes: Routes = [
  {path:'', redirectTo: '/empleados', pathMatch:'full'},
  {path: 'administrador', component: AdministradorComponent},
  {path: 'empleados', component: EmpleadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
