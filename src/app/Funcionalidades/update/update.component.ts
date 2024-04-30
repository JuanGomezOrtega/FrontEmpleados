import { Component } from '@angular/core';
import { EmpleadosComponent } from '../../empleados/empleados.component';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
    empleadosComponente: EmpleadosComponent = new EmpleadosComponent(this.employeeService);
    
    constructor(private employeeService: EmployeeService){
  }
}
