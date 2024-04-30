import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import * as FileSaver from 'file-saver';
import { EmpleadosComponent } from '../empleados/empleados.component';
import { HttpErrorResponse } from '@angular/common/http';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.css',
})
export class AdministradorComponent implements OnInit{
  employees: Employee[] =[];
  empleadoComponente: EmpleadosComponent = new EmpleadosComponent(this.employeeService);
  selectedEmployee!: Employee[];
  deleteEmployees: number[] = [];
  fila: any[] = [];
  mostrarFiltro: boolean = false;
  valorId!: number;
  valorName!: string;
  valorPhone!: string;
  valorEmail!: string;
  valorJob!: string;

  constructor(private employeeService: EmployeeService) {}

  cols!: Column[];

  exportColumns!: ExportColumn[];

  ngOnInit() {
    
      this.empleadoComponente.getEmployees();
      
      console.log(this.employees);
      this.cols = [
          { field: 'id', header: 'Id', customExportHeader: 'Id ' },
          { field: 'name', header: 'Name' },
          { field: 'jobTitle', header: 'JobTitle' },
          { field: 'email', header: 'Email' },
          { field: 'phone', header: 'Phone' },
          { field: 'image', header: 'Image' }
      ];

      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  exportPdf() {
      import('jspdf').then((jsPDF) => {
          import('jspdf-autotable').then((x) => {
              const doc = new jsPDF.default('p', 'px', 'a4');
              (doc as any).autoTable(this.exportColumns, this.empleadoComponente.employees);
              doc.save('employees.pdf');
          });
      });
  }

  exportExcel() {
      import('xlsx').then((xlsx) => {
          const worksheet = xlsx.utils.json_to_sheet(this.employees);
          const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, 'employees');
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

disparador(s: string){
    this.empleadoComponente.onOpenModal(s);
}
disparadorDelete(id: number[]){
    console.log(this.deleteEmployees)
    id.forEach(element => {
        this.empleadoComponente.onDeleteEmloyee(element);
        console.log(element)
    });
    
}
seleccionFila(rowData: any) {
    console.log(rowData);
    if(this.deleteEmployees.indexOf(rowData) === -1){
        this.deleteEmployees.push(rowData.id);
        this.empleadoComponente.editEmployee = rowData;
        console.log(this.deleteEmployees);
    }
}

disparadorUpdate(employee: Employee){
    this.empleadoComponente.onUpdateEmloyee(employee);
}
mostrar(){
    if(this.mostrarFiltro) {
        this.mostrarFiltro = false;
    }else{
        this.mostrarFiltro=true;
    }
}

AplicarFiltro(){
   const results: Employee[] = [];

   for (const employee of this.empleadoComponente.employees) {
    if (employee.id == this.valorId || 
        employee.email.indexOf(this.valorEmail)!==-1  ||
        employee.jobTitle.indexOf(this.valorJob)!==-1  ||
        employee.name.indexOf(this.valorName)!==-1 ||
        employee.phone.indexOf(this.valorPhone)!==-1 
   ) {
      results.push(employee);
    }
  }
  this.empleadoComponente.employees = results;
  if (results.length === 0 ) {
    this.empleadoComponente.getEmployees();
  }
   
}

}