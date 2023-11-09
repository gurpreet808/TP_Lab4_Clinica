import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObrasSocialesRoutingModule } from './obras-sociales-routing.module';
import { ObrasSocialesComponent } from './obras-sociales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    ObrasSocialesComponent
  ],
  imports: [
    CommonModule,
    ObrasSocialesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ButtonModule,
    InputTextModule
  ]
})
export class ObrasSocialesModule { }
