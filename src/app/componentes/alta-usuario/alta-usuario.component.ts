import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent implements OnInit {

  @Input() tipo_usuario: string = '';
  especialidades: string[] = [];
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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