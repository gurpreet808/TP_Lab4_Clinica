import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarseRoutingModule } from './registrarse-routing.module';
import { RegistrarseComponent } from './registrarse.component';


@NgModule({
  declarations: [
    RegistrarseComponent
  ],
  imports: [
    CommonModule,
    RegistrarseRoutingModule
  ]
})
export class RegistrarseModule { }
