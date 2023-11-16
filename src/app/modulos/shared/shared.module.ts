import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaUsuarioComponent } from 'src/app/componentes/alta-usuario/alta-usuario.component';
import { PrimeNGModule } from '../prime-ng/prime-ng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AltaUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    HttpClientModule,
    InputNumberModule,
    InputTextModule,
    PasswordModule
    //PrimeNGModule
  ],
  exports: [AltaUsuarioComponent]
})
export class SharedModule { }
