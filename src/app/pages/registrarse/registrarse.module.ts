import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarseRoutingModule } from './registrarse-routing.module';
import { RegistrarseComponent } from './registrarse.component';
import { SharedModule } from 'src/app/modulos/shared/shared.module';

import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [
    RegistrarseComponent
  ],
  imports: [
    CommonModule,
    RegistrarseRoutingModule,
    ButtonModule,
    SharedModule
  ]
})
export class RegistrarseModule { }
