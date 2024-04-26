import { Component } from '@angular/core';
import { EmpleadosComponent } from '../../empleados/empleados.component';
import { EmployeeService } from '../../employee.service';
import { Injectable } from '@angular/core';
@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrl: './agregar-empleado.component.css'
})
export class AgregarEmpleadoComponent {
  empleadosComponente: EmpleadosComponent = new EmpleadosComponent(this.employeeService);
  
  constructor(private employeeService: EmployeeService){
  }
}
