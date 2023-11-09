import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecialidadesRoutingModule } from './especialidades-routing.module';
import { EspecialidadesComponent } from './especialidades.component';


@NgModule({
  declarations: [
    EspecialidadesComponent
  ],
  imports: [
    CommonModule,
    EspecialidadesRoutingModule
  ]
})
export class EspecialidadesModule { }
