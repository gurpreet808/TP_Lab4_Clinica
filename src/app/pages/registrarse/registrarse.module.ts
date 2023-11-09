import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarseRoutingModule } from './registrarse-routing.module';
import { RegistrarseComponent } from './registrarse.component';
import { SharedModule } from 'src/app/modulos/shared/shared.module';


@NgModule({
  declarations: [
    RegistrarseComponent
  ],
  imports: [
    CommonModule,
    RegistrarseRoutingModule,
    SharedModule
  ]
})
export class RegistrarseModule { }
