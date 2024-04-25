import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public imagenFinal: String = "";
  public archivos: any = [];
  public employees: Employee[] =[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService){
  this.editEmployee = {
    id: 0,
    name: "",
    email: "",
    jobTitle: "",
    phone:  "",
    image: "",
    employeeCode:  ""      
  }
    
  this.deleteEmployee = { id: 0,
    name: "",
    email: "",
    jobTitle: "",
    phone:  "",
    image:"",
    employeeCode:  ""
  };
}
  ngOnInit() {
    this.getEmployees();
  }
  capturarFile(event:any){
    const archivoCapturado = event.target.files[0];
    this.base64(archivoCapturado).then((image: any) => this.imagenFinal=image);
    
    this.archivos.push(archivoCapturado);

    //console.log(archivoCapturado);
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        //console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddEmloyee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.editEmployee = addForm.value;
    console.log(this.imagenFinal);
    this.editEmployee.image=this.imagenFinal;
    console.log(this.editEmployee)
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(employee: Employee): void {
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteEmloyee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.log(response);
        this.getEmployees();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchEmployees(key: string): void {
    console.log(key);
    const results: Employee[] = [];
    for (const employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.phone.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(employee);
      }
    }
    this.employees = results;
    if (results.length === 0 || !key) {
      this.getEmployees();
    }
  }

  public onOpenModal( mode: string,employee?: Employee): void{
    const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if(mode ==='add'){
        button.setAttribute('data-target', '#addEmployeeModal');
      }
      if(mode ==='edit'){ 
        if(employee != null) {
          this.editEmployee = employee
        } 
        button.setAttribute('data-target', '#updateEmployeeModal');
      }
      if(mode ==='delete'){
        if(employee != null) {
          this.deleteEmployee = employee
        }
        button.setAttribute('data-target', '#deleteEmployeeModal');
      }
      container?.appendChild(button);
      button.click();

  }

  

  base64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const image = reader.result?.toString();
            if (image) {
                resolve(image);
            } else {
                reject(new Error('No se pudo convertir el archivo a base64'));
            }
        };
        reader.onerror = error => {
            reject(error);
        };
    });
}
}