import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'fa-solid fa-house',
      routerLink: '/'
    },
    {
      label: 'Usuarios',
      icon: 'fa-solid fa-users-gear',
      routerLink: '/usuarios'
    },
    {
      label: 'Especialistas',
      icon: 'fa-solid fa-user-doctor',
      routerLink: '/especialistas'
    },
    {
      label: 'Pacientes',
      icon: 'fa-solid fa-users',
      routerLink: '/pacientes'
    },
    {
      label: 'Especialidades',
      icon: 'fa-solid fa-stethoscope',
      routerLink: '/especialidades'
    },
    {
      label: 'Obras sociales',
      icon: 'fa-solid fa-briefcase-medical',
      routerLink: '/obras-sociales'
    }
  ];

  ngOnInit(): void {
  }

  constructor(public servAuth: AuthService, private router: Router) { }

  Desloguear() {
    this.servAuth.LogOut();
    this.router.navigateByUrl('/login');
  }
}
