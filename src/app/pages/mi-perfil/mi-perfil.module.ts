import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MiPerfilRoutingModule } from './mi-perfil-routing.module';
import { MiPerfilComponent } from './mi-perfil.component';
import { SharedModule } from 'src/app/modulos/shared/shared.module';


@NgModule({
  declarations: [
    MiPerfilComponent
  ],
  imports: [
    CommonModule,
    MiPerfilRoutingModule,
    SharedModule
  ]
})
export class MiPerfilModule { }
