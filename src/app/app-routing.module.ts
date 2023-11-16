import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'registrarse', loadChildren: () => import('./pages/registrarse/registrarse.module').then(m => m.RegistrarseModule) },
  { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'obras-sociales', loadChildren: () => import('./pages/obras-sociales/obras-sociales.module').then(m => m.ObrasSocialesModule) },
  { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'obras-sociales', loadChildren: () => import('./pages/obras-sociales/obras-sociales.module').then(m => m.ObrasSocialesModule) },
  { path: 'especialidades', loadChildren: () => import('./pages/especialidades/especialidades.module').then(m => m.EspecialidadesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
