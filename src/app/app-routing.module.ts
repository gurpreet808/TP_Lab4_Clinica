import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { anonGuard } from './guards/anon.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'login', canActivate: [anonGuard], loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: 'registrarse', canActivate: [anonGuard], loadChildren: () => import('./pages/registrarse/registrarse.module').then(m => m.RegistrarseModule) },
  { path: 'usuarios', canActivate: [adminGuard], loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'obras-sociales', canActivate: [adminGuard], loadChildren: () => import('./pages/obras-sociales/obras-sociales.module').then(m => m.ObrasSocialesModule) },
  { path: 'especialidades', canActivate: [adminGuard], loadChildren: () => import('./pages/especialidades/especialidades.module').then(m => m.EspecialidadesModule) },
  { path: '**', loadChildren: () => import('./pages/error404/error404.module').then(m => m.Error404Module) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
