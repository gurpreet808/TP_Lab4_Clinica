import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaUsuariosComponent } from './componentes/lista-usuarios/lista-usuarios.component';
import { ListaPacientesComponent } from './componentes/lista-pacientes/lista-pacientes.component';
import { ListaEspecialistasComponent } from './componentes/lista-especialistas/lista-especialistas.component';
import { ListaObrasSocialesComponent } from './componentes/lista-obras-sociales/lista-obras-sociales.component';
import { ListaEspecialidadesComponent } from './componentes/lista-especialidades/lista-especialidades.component';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'usuarios', component: ListaUsuariosComponent
  },
  {
    path: 'pacientes', component: ListaPacientesComponent
  },
  {
    path: 'especialistas', component: ListaEspecialistasComponent
  },
  {
    path: 'obras-sociales', component: ListaObrasSocialesComponent
  },
  {
    path: 'especialidades', component: ListaEspecialidadesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
