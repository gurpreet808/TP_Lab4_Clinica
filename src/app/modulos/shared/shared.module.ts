import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaUsuarioComponent } from 'src/app/componentes/alta-usuario/alta-usuario.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { HttpClientModule } from '@angular/common/http';
import { CardUsuarioComponent } from 'src/app/componentes/card-usuario/card-usuario.component';
import { CardPacienteComponent } from 'src/app/componentes/card-paciente/card-paciente.component';
import { CardEspecialistaComponent } from 'src/app/componentes/card-especialista/card-especialista.component';

@NgModule({
  declarations: [
    AltaUsuarioComponent,
    CardUsuarioComponent,
    CardPacienteComponent,
    CardEspecialistaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    MultiSelectModule
    //PrimeNGModule
  ],
  exports: [
    AltaUsuarioComponent,
    CardUsuarioComponent,
    CardPacienteComponent,
    CardEspecialistaComponent
  ]
})
export class SharedModule { }
