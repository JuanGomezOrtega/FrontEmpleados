import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent {
   items: MenuItem[] | undefined;

    activeItem: MenuItem | undefined;

    ngOnInit() {
        this.items = [
            { label: 'Empleados', icon: 'pi pi-fw pi-home', routerLink: '/empleados'},
            { label: 'Administracion', icon: 'pi pi-fw pi-file', routerLink: '/administrador'}
        ];

        this.activeItem = this.items[0];
    }
}
