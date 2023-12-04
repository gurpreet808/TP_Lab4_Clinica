import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltaUsuarioComponent } from 'src/app/componentes/alta-usuario/alta-usuario.component';
import { CardUsuarioComponent } from 'src/app/componentes/card-usuario/card-usuario.component';
import { CardPacienteComponent } from 'src/app/componentes/card-paciente/card-paciente.component';
import { CardEspecialistaComponent } from 'src/app/componentes/card-especialista/card-especialista.component';
import { ObraSocialPipe } from 'src/app/pipes/obra-social.pipe';
import { EspecialidadPipe } from 'src/app/pipes/especialidad.pipe';
//import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';
import { DiaPipe } from 'src/app/pipes/dia.pipe';
import { SolicitarTurnoComponent } from 'src/app/componentes/solicitar-turno/solicitar-turno.component';
import { VerDisponibilidadComponent } from 'src/app/componentes/ver-disponibilidad/ver-disponibilidad.component';
//import { FileUploadModule } from 'primeng/fileupload';

@NgModule({
  declarations: [
    AltaUsuarioComponent,
    CardUsuarioComponent,
    CardPacienteComponent,
    CardEspecialistaComponent,
    SolicitarTurnoComponent,
    VerDisponibilidadComponent,
    ObraSocialPipe,
    EspecialidadPipe,
    DiaPipe
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
    MultiSelectModule,
    //FileUploadModule
    //PrimeNGModule
  ],
  exports: [
    AltaUsuarioComponent,
    CardUsuarioComponent,
    CardPacienteComponent,
    CardEspecialistaComponent,
    SolicitarTurnoComponent,
    VerDisponibilidadComponent,
    ObraSocialPipe,
    EspecialidadPipe
  ]
})
export class SharedModule { }
