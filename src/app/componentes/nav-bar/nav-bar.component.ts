import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { skip } from 'rxjs';
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
    }
  ];

  constructor(public servAuth: AuthService, private router: Router) {
    //this.AdminItems();
    this.servAuth.logueado.pipe(
      //skip(1)
    ).subscribe(
      (logueado: boolean) => {
        //console.log("logueado", this.servAuth.usuarioActual);

        if (logueado == true) {

          if (servAuth.emailVerified == false) {
            this.items = [
              {
                label: 'Home',
                icon: 'fa-solid fa-house',
                routerLink: '/'
              }
            ];
          } else {
            switch (this.servAuth.usuarioActual?.tipo) {
              case 'admin':
                //console.log("admin");
                this.AdminItems();
                break;

              case 'paciente':
                //console.log("paciente");
                this.PacienteItems();
                break;

              case 'especialista':
                //console.log("especialista");
                this.EspecialistaItems();
                break;

              default:
                //console.log("default");
                break;
            }
          }

        }
      }
    );
  }

  ngOnInit(): void {
  }

  Desloguear() {
    this.servAuth.LogOut();
    this.router.navigateByUrl('/login');
  }

  AdminItems() {
    this.items = [
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
        label: 'Turnos',
        icon: 'fa-solid fa-calendar-days',
        routerLink: '/turnos'
      },
      {
        label: 'Solicitar turno',
        icon: 'fa-solid fa-calendar-plus',
        routerLink: '/solicitar-turno'
      },
      /* {
        label: 'Especialistas',
        icon: 'fa-solid fa-user-doctor',
        routerLink: '/especialistas'
      },
      {
        label: 'Pacientes',
        icon: 'fa-solid fa-users',
        routerLink: '/pacientes'
      }, */
      {
        label: 'Especialidades',
        icon: 'fa-solid fa-stethoscope',
        routerLink: '/especialidades'
      },
      {
        label: 'Obras sociales',
        icon: 'fa-solid fa-briefcase-medical',
        routerLink: '/obras-sociales'
      },
      {
        label: 'Mi perfil',
        icon: 'fa-solid fa-address-card',
        routerLink: '/mi-perfil'
      }
    ];
  }

  PacienteItems() {
    this.items = [
      {
        label: 'Home',
        icon: 'fa-solid fa-house',
        routerLink: '/'
      },
      {
        label: 'Mis turnos',
        icon: 'fa-solid fa-calendar-days',
        routerLink: '/mis-turnos'
      },
      {
        label: 'Solicitar turno',
        icon: 'fa-solid fa-calendar-plus',
        routerLink: '/solicitar-turno'
      },
      {
        label: 'Mi perfil',
        icon: 'fa-solid fa-address-card',
        routerLink: '/mi-perfil'
      }
    ];
  }

  EspecialistaItems() {
    this.items = [
      {
        label: 'Home',
        icon: 'fa-solid fa-house',
        routerLink: '/'
      },
      {
        label: 'Mis turnos',
        icon: 'fa-solid fa-calendar-days',
        routerLink: '/mis-turnos'
      },
      {
        label: 'Mi perfil',
        icon: 'fa-solid fa-address-card',
        routerLink: '/mi-perfil'
      }
    ];
  }
}
