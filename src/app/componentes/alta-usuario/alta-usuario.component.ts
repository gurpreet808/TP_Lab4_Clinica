import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent implements OnInit {

  @Input() tipo_usuario: string = '';
  especialidades: string[] = [];

  adminForm: FormGroup = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      clave2: ['', [Validators.required, Validators.minLength(6)]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      dni: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      edad: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      url_foto_1: ['', [Validators.required]]
    }
  );
  pacienteForm: FormGroup = new FormGroup(this.adminForm.controls);
  especialistaForm: FormGroup = new FormGroup(this.adminForm.controls);

  constructor(private formBuilder: FormBuilder) {
    this.InicializarFormularios();
  }

  ngOnInit(): void {
  }

  InicializarFormularios() {
    //const adminFormGroupString = JSON.stringify(this.adminForm);
    //const adminFormGroupJSON = JSON.parse(adminFormGroupString);

    //this.pacienteForm = new FormGroup(adminFormGroupJSON);

    this.pacienteForm.addControl('url_foto_2', new FormControl('', [Validators.required]));
    this.pacienteForm.addControl('obra_social', new FormControl('', [Validators.required]));

    //this.especialistaForm = new FormGroup(adminFormGroupJSON);

    this.especialistaForm.addControl('habilitado', new FormControl('', [Validators.required]));
    this.especialistaForm.addControl('especialidades', new FormControl('', [Validators.required]));
  }

}
