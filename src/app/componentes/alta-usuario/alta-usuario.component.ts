import { Component, Input, OnInit } from '@angular/core';
import { UploadTaskSnapshot } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { ObraSocial } from 'src/app/clases/obra-social';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { FileHandlerService } from 'src/app/servicios/file-handler.service';
import { ObraSocialService } from 'src/app/servicios/obra-social.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { especialistaRequiredValidator } from 'src/app/validators/especialista-required.validator';
import { ExisteMailValidator } from 'src/app/validators/existe-mail.validator';
import { pacienteRequiredValidator } from 'src/app/validators/paciente-required.validator';
import { confirmarCalveValidator } from 'src/app/validators/repetir-clave.validator';

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
  file_1: File | undefined;
  file_2: File | undefined;

  constructor(
    private formBuilder: FormBuilder,
    public servObraSocial: ObraSocialService,
    public servEspecialidad: EspecialidadService,
    public servUsuario: UsuarioService,
    public servFile: FileHandlerService,
    public servSpinner: SpinnerService
  ) {
    this.servSpinner.showWithMessage('alta-usuario-init', 'Cargando datos...');

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
        email: ['', [Validators.required, Validators.email], [ExisteMailValidator(servUsuario)]],
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

    this.userForm.setValidators(confirmarCalveValidator('clave', 'clave2'));
  }

  ngOnInit(): void {
    console.log(this.tipo_usuario);
    this.userForm.get('especialidades')?.setValidators(especialistaRequiredValidator(this.tipo_usuario));
    this.userForm.get('obra_social')?.setValidators(pacienteRequiredValidator(this.tipo_usuario));
    this.userForm.get('url_foto_2')?.setValidators(pacienteRequiredValidator(this.tipo_usuario));
    this.userForm.markAllAsTouched();
    this.servSpinner.hideWithMessage('alta-usuario-init');
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

  async RegistrarUsuario() {
    console.log(this.userForm);
    this.servSpinner.showWithMessage('registrar-usuario', 'Registrando usuario...');

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
          (usuario as Paciente).obra_social = this.getControlValue('obra_social').id;
          break;

        default:
          break;
      }

      await this.servUsuario.AgregarUsuario(usuario).then(
        (user_id: string) => {
          const images_path = `images/usuarios/${user_id}/`;

          if (this.file_1 != undefined) {
            this.servSpinner.showWithMessage('registrar-usuario', 'Subiendo imagen 1...');
            let path_1 = `${images_path}${this.file_1.name}`;
            let task = this.servFile.uploadFile(this.file_1, path_1);

            task.on(
              'state_changed',
              (task_snapshot: UploadTaskSnapshot) => {
                console.log(task_snapshot.bytesTransferred, task_snapshot.totalBytes);
                let progress = (task_snapshot.bytesTransferred / task_snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                this.servSpinner.showWithMessage('registrar-usuario-progress', `${progress.toFixed(2)}%`);
                //await new Promise(resolve => setTimeout(resolve, 0));
              }, (error) => {
                console.log(error);
              }, () => {
                usuario.url_foto_1 = path_1;
              }
            );

            this.servUsuario.ModificarUsuario(usuario).then(
              () => {
                console.log('Usuario modificado');
                this.servSpinner.hideWithMessage('registrar-usuario-progress');
              }
            ).catch(
              (error) => {
                console.log(error);
              }
            );
          }
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
  }

  fileChange(event: any, file_number: number) {
    let files = event.target.files;

    if (files.length > 0) {
      switch (file_number) {
        case 1:
          this.file_1 = files[0];
          break;

        case 2:
          this.file_2 = files[0];
          break;

        default:
          break;
      }
    }

    console.log(this.file_1);
    console.log(this.file_2);
  }
}