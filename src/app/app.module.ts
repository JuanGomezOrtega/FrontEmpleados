import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { AdministradorComponent } from './administrador/administrador.component';
import { NavComponent } from './nav/nav.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { EmpleadosComponent } from './empleados/empleados.component';
import { TableModule } from 'primeng/table';
import { AgregarEmpleadoComponent } from './Funcionalidades/agregar-empleado/agregar-empleado.component';
import { UpdateComponent } from './Funcionalidades/update/update.component';
import { KeyFilterModule } from 'primeng/keyfilter';



@NgModule({
  declarations: [
    AppComponent,
    AdministradorComponent,
    NavComponent,
    EmpleadosComponent,
    AgregarEmpleadoComponent,
    UpdateComponent,

  ],
  imports: [
    BrowserModule, KeyFilterModule,
    HttpClientModule, FormsModule, AppRoutingModule, TabMenuModule, ButtonModule, TableModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
