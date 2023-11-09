import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

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
      icon: 'fa-regular fa-lightbulb',
      routerLink: '/usuarios'
    },
    {
      label: 'Especialistas',
      icon: 'fa-regular fa-lightbulb',
      routerLink: '/especialistas'
    },
    {
      label: 'Pacientes',
      icon: 'fa-regular fa-lightbulb',
      routerLink: '/pacientes'
    },
    {
      label: 'Especialidades',
      icon: 'fa-regular fa-lightbulb',
      routerLink: '/especialidades'
    },
    {
      label: 'Obras sociales',
      icon: 'fa-regular fa-lightbulb',
      routerLink: '/obras-sociales'
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  Desloguear() {
  }
}
