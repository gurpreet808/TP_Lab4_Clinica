import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { ObraSocial } from 'src/app/clases/obra-social';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { ObraSocialService } from 'src/app/servicios/obra-social.service';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent implements OnInit {

  @Input() tipo_usuario: string = '';
  especialidades: Especialidad[] = [];
  obras_sociales: ObraSocial[] = [];
  agregar_especialidad: string = '';
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public servObraSocial: ObraSocialService, public servEspecialidad: EspecialidadService) {
    this.servObraSocial.obras_sociales.subscribe(
      (obras_sociales) => {
        this.obras_sociales = obras_sociales;
      }
    );

    this.servEspecialidad.especialidades.subscribe(
      (especialidades) => {
        this.especialidades = especialidades;
      }
    );

    this.userForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        clave: ['', [Validators.required, Validators.minLength(6)]],
        clave2: ['', [Validators.required, Validators.minLength(6)]],
        nombre: ['', [Validators.required, Validators.pattern('^[a-zA-Záéíóúñ .,]+$')]],
        apellido: ['', [Validators.required, Validators.pattern('^[a-zA-Záéíóúñ .,]+$')]],
        dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        edad: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
        url_foto_1: ['', [Validators.required]],
        url_foto_2: ['',],
        obra_social: ['',],
        especialidades: ['',],
      }
    );
  }

  ngOnInit(): void {
    console.log(this.tipo_usuario);
    this.userForm.get('especialidades')?.setValidators(especialistaRequiredValidator(this.tipo_usuario));
    this.userForm.get('obra_social')?.setValidators(pacienteRequiredValidator(this.tipo_usuario));
    this.userForm.get('url_foto_2')?.setValidators(pacienteRequiredValidator(this.tipo_usuario));
    this.userForm.markAllAsTouched();
  }

  getControl(control_name: string) {
    return this.userForm.get(control_name);
  }

  getControlValue(control_name: string) {
    return this.getControl(control_name)?.value;
  }

  isValidControl(control_name: string) {
    let control = this.getControl(control_name);

    if (control != null) {
      return control.invalid;
    }

    return false;
  }

  logForm() {
    console.log(this.userForm);
  }

  RegistrarUsuario() {
    console.log(this.userForm);

    if (this.userForm.valid) {
      let usuario: Usuario | Especialista | Paciente = {
        id: 'new',
        email: this.getControlValue('email'),
        clave: this.getControlValue('clave'),
        tipo: this.tipo_usuario,
        nombre: this.getControlValue('nombre'),
        apellido: this.getControlValue('apellido'),
        dni: this.getControlValue('dni'),
        edad: this.getControlValue('edad'),
        url_foto_1: this.getControlValue('url_foto_1'),
        email_verificado: false,
        fecha_alta: Date.now(),
        fecha_modificacion: Date.now(),
      }

      switch (usuario.tipo) {
        case "especialista":
          (usuario as Especialista).especialidades = this.getControlValue('especialidades');
          (usuario as Especialista).habilitado = false;
          break;

        case "paciente":
          (usuario as Paciente).url_foto_2 = this.getControlValue('url_foto_2');
          (usuario as Paciente).obra_social = this.getControlValue('obra_social');
          break;

        default:
          break;
      }
    }
  }

}

export function especialistaRequiredValidator(tipoUsuario: string): ValidatorFn | ValidatorFn[] | null {
  return (control: AbstractControl) => {
    if (tipoUsuario === 'especialista' && control.value.length === 0) {
      return { required: true };
    }

    return null;
  };
}

export function pacienteRequiredValidator(tipoUsuario: string): ValidatorFn | ValidatorFn[] | null {
  return (control: AbstractControl) => {
    if (tipoUsuario === 'paciente' && control.value.length === 0) {
      return { required: true };
    }

    return null;
  };
}