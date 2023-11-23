import { Component, Input, OnInit } from '@angular/core';
import { UploadTaskSnapshot } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { DisponibilidadEspecialidad } from 'src/app/clases/disponibilidad-especialidad';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { ObraSocial } from 'src/app/clases/obra-social';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { FileHandlerService } from 'src/app/servicios/file-handler.service';
import { ObraSocialService } from 'src/app/servicios/obra-social.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { especialistaRequiredValidator } from 'src/app/validators/especialista-required.validator';
import { ExisteDNIValidator } from 'src/app/validators/existe-dni.validator';
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

  new_disponibilidad: DisponibilidadEspecialidad = {
    dia: -1,
    hora_fin: 0,
    hora_inicio: 0,
    especialidad: '',
  }

  dias: SelectItem[] = [
    { label: 'Lunes', value: 1, title: "1" },
    { label: 'Martes', value: 2, title: "2" },
    { label: 'Miércoles', value: 3, title: "3" },
    { label: 'Jueves', value: 4, title: "4" },
    { label: 'Viernes', value: 5, title: "5" },
    { label: 'Sábado', value: 6, title: "6" },
    { label: 'Domingo', value: 0, title: "0" }
  ];

  constructor(
    private formBuilder: FormBuilder,
    public servObraSocial: ObraSocialService,
    public servEspecialidad: EspecialidadService,
    public servUsuario: UsuarioService,
    public servAuth: AuthService,
    public servFile: FileHandlerService,
    public servSpinner: SpinnerService,
    public messageService: MessageService,
    public router: Router,
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
        dni: ['', [Validators.required, Validators.minLength(10000000), Validators.maxLength(99999999), Validators.pattern('^[0-9]{8}$')], [ExisteDNIValidator(servUsuario)]],
        edad: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
        url_foto_1: ['', [Validators.required]],
        url_foto_2: ['',],
        obra_social: ['',],
        especialidades: ['',],
        disponibilidades: ['',],
      }
    );

    this.userForm.setValidators(confirmarCalveValidator('clave', 'clave2'));
  }

  ngOnInit(): void {
    console.log(this.tipo_usuario);
    this.userForm.get('especialidades')?.setValidators(especialistaRequiredValidator(this.tipo_usuario));
    this.userForm.get('disponibilidades')?.setValidators(especialistaRequiredValidator(this.tipo_usuario));
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
          (usuario as Especialista).habilitado = false;
          if (this.servAuth.usuarioActual && this.servAuth.usuarioActual.tipo == 'admin') {
            (usuario as Especialista).habilitado = true;
          }
          let especialidades: Especialidad[] = this.getControlValue('especialidades');
          (usuario as Especialista).especialidades = [];
          //(usuario as Especialista).especialidades = this.getControlValue('especialidades').id;
          for (let e = 0; e < especialidades.length; e++) {
            (usuario as Especialista).especialidades.push(especialidades[e].id);
          }
          break;

        case "paciente":
          (usuario as Paciente).obra_social = this.getControlValue('obra_social').id;
          break;

        default:
          break;
      }

      await this.servAuth.RegistrarUsuarioConEmail(usuario).then(
        async (_usuario: Usuario) => {
          //console.log("usuario creado", _usuario);
          //console.log("usuario anterior", usuario);

          const images_path = `images/usuarios/${_usuario.id}/`;

          if (this.file_1 != undefined) {
            this.servSpinner.showWithMessage('registrar-usuario', 'Subiendo imagen 1...');
            let path_1 = `${images_path}${this.file_1.name}`;

            _usuario.url_foto_1 = await this.servFile.uploadFileAndGetURL(this.file_1, path_1).then(
              async (url: string) => {
                console.log("in await 1", url);
                this.servSpinner.showWithMessage('registrar-usuario', 'Guardando datos de usuario...');
                return url;
              }
            ).catch(
              (error) => {
                console.log("subir img 1", error);
                throw error;
              }
            );
          }

          if (this.file_2 != undefined) {
            this.servSpinner.showWithMessage('registrar-usuario', 'Subiendo imagen 2...');
            let path_2 = `${images_path}${this.file_2.name}`;

            (_usuario as Paciente).url_foto_2 = await this.servFile.uploadFileAndGetURL(this.file_2, path_2).then(
              async (url: string) => {
                console.log("in await 2", url);
                this.servSpinner.showWithMessage('registrar-usuario', 'Guardando datos de usuario...');
                return url;
              }
            ).catch(
              (error) => {
                console.log("subir img 2", error);
                throw error;
              }
            );
          }

          console.log("pre mod", _usuario);

          this.servUsuario.ModificarUsuario(_usuario).then(
            () => {
              console.log('Usuario modificado');
              this.servSpinner.hideWithMessage('registrar-usuario');
              this.messageService.add({ severity: 'success', life: 10000, summary: 'Bien', detail: 'Se registró su usuario. Recuerde verificar su mail para usar la aplicación.' });
              this.router.navigate(['/']);
            }
          ).catch(
            (error) => {
              console.log("mod after upload", error);
            }
          );
        }
      ).catch(
        (error) => {
          console.log("Agregar usuario", error);
        }
      );
    }
  }

  async AgregarEspecialidad() {
    if (this.agregar_especialidad != '') {
      let especialidad: Especialidad = {
        id: 'new',
        nombre: this.agregar_especialidad,
        valida: false
      }

      /* if (this.servAuth.usuarioActual && this.servAuth.usuarioActual.tipo == 'admin') {
        especialidad.valida = true;
      } */

      this.servSpinner.showWithMessage('agregar-especialidad', 'Agregando especialidad...');

      await this.servEspecialidad.AgregarEspecialidad(especialidad).then(
        () => {
          this.agregar_especialidad = '';
          this.messageService.add({ severity: 'success', life: 10000, summary: 'Bien', detail: 'Se agregó la especialidad' });
        }
      ).catch(
        (error) => {
          console.log(error);
          this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: error });
        }
      );

      this.servSpinner.hideWithMessage('agregar-especialidad');
    }
  }

  fileChange(event: any, file_number: number) {
    let files = event.target.files;

    if (files.length > 0) {
      switch (file_number) {
        case 1:
          if (files[0].type.split('/')[0] != 'image') {
            this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: 'El archivo debe ser una imagen' });
            this.userForm.get('url_foto_1')?.setValue('');
            return;
          }

          if (files[0].size > 2097152) {
            this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: 'El archivo no debe pesar más de 2MB' });
            this.userForm.get('url_foto_1')?.setValue('');
            return;
          }

          this.file_1 = files[0];
          break;

        case 2:
          if (files[0].type.split('/')[0] != 'image') {
            this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: 'El archivo debe ser una imagen' });
            this.userForm.get('url_foto_2')?.setValue('');
            return;
          }

          if (files[0].size > 2097152) {
            this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: 'El archivo no debe pesar más de 2MB' });
            this.userForm.get('url_foto_2')?.setValue('');
            return;
          }

          this.file_2 = files[0];
          break;

        default:
          break;
      }
    }

    console.log(this.file_1);
    console.log(this.file_2);
  }

  AgregarDisponibilidad() {
    console.log(this.new_disponibilidad);

    if (this.new_disponibilidad.hora_fin <= this.new_disponibilidad.hora_inicio) {
      this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: 'La hora de fin debe ser mayor a la de inicio' });
      return;
    }

    let disponibilidades: DisponibilidadEspecialidad[] = this.getControlValue('disponibilidades');
    let overlap = false;
    for (let d = 0; d < disponibilidades.length; d++) {
      if (disponibilidades[d].dia == this.new_disponibilidad.dia) {
        if (disponibilidades[d].hora_inicio < this.new_disponibilidad.hora_inicio && this.new_disponibilidad.hora_inicio < disponibilidades[d].hora_fin) {
          overlap = true;
          break;
        }
        if (disponibilidades[d].hora_inicio < this.new_disponibilidad.hora_fin && this.new_disponibilidad.hora_fin < disponibilidades[d].hora_fin) {
          overlap = true;
          break;
        }
        if (this.new_disponibilidad.hora_inicio < disponibilidades[d].hora_inicio && disponibilidades[d].hora_inicio < this.new_disponibilidad.hora_fin) {
          overlap = true;
          break;
        }
        if (this.new_disponibilidad.hora_inicio < disponibilidades[d].hora_fin && disponibilidades[d].hora_fin < this.new_disponibilidad.hora_fin) {
          overlap = true;
          break;
        }
      }
    }

    if (overlap) {
      this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: 'Los horarios elegidos se superponen en ese día' });
      return;
    }

    this.getControl('disponibilidades')?.setValue([...this.getControlValue('disponibilidades'), this.new_disponibilidad]);

    this.new_disponibilidad = {
      dia: -1,
      hora_fin: 0,
      hora_inicio: 0,
      especialidad: '',
    }
  }

  BorrarDisponibilidad(disponibilidad: DisponibilidadEspecialidad) {
    let disponibilidades: DisponibilidadEspecialidad[] = this.getControlValue('disponibilidades');
    let index = disponibilidades.indexOf(disponibilidad);
    disponibilidades.splice(index, 1);
    this.getControl('disponibilidades')?.setValue(disponibilidades);
  }
}