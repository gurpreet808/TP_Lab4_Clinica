import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { Especialidad } from 'src/app/clases/especialidad';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { AuthService } from 'src/app/servicios/auth.service';
import { DisponibilidadService } from 'src/app/servicios/disponibilidad.service';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  paciente: Paciente | undefined;
  especialistas: Especialista[] = [];
  especialista: Especialista | undefined;
  especialidades: Especialidad[] = [];
  especialidad_id: string = '';
  ready: {
    pacientes: boolean,
    especialistas: boolean,
    especialidades: boolean
  } = {
      pacientes: false,
      especialistas: false,
      especialidades: false
    };

  constructor(
    public servAuth: AuthService,
    public servUsuario: UsuarioService,
    public servEspecialidad: EspecialidadService,
    public servDisponibilidad: DisponibilidadService,
    public servTurno: TurnoService,
    public servSpinner: SpinnerService
  ) {

    this.servSpinner.showWithMessage('st-data-loading', "Cargando datos...");

    this.servAuth.logueado.subscribe(
      (logueado) => {
        if (this.servAuth.usuarioActual && this.servAuth.usuarioActual.tipo === 'paciente') {
          this.paciente = this.servAuth.usuarioActual as Paciente;
          //console.log(this.paciente);
        }
      }
    );

    this.suscripciones();
  }

  ngOnInit(): void {
  }

  suscripciones() {
    this.servEspecialidad.especialidades.subscribe(
      (_especialidades) => {
        this.ready.especialidades = true;
        this.FiltrarEspecialistas();
      }
    );

    this.servUsuario.especialistas.subscribe(
      (especialistas) => {
        this.ready.especialistas = true;
        this.FiltrarEspecialistas();
      }
    );
  }

  ElegirPaciente(_paciente: Paciente) {
    this.paciente = _paciente;
    //console.log(this.paciente);
    this.especialista = undefined;
    this.especialidad_id = '';
  }

  CancelarPaciente() {
    this.paciente = undefined;
    this.especialista = undefined;
    this.especialidad_id = '';
  }

  ElegirEspecialista(_especialista: Especialista) {
    this.especialista = _especialista;
    console.log(this.especialista);
    this.especialidad_id = '';
  }

  CancelarEspecialista() {
    this.especialista = undefined;
    this.especialidad_id = '';
  }

  ElegirEspecialidad(_especialidad_id: string) {
    this.especialidad_id = _especialidad_id;
    //console.log(this.especialidad_id);

    if (this.especialista && this.especialista.disponibilidades && this.especialista.disponibilidades.length > 0 && this.especialidad_id) {

      this.servDisponibilidad.DisponibilidadEspecialidadDeEspecialistaPorDia(1, this.especialidad_id, this.especialista.disponibilidades).then((disponibilidades) => {
        console.log(disponibilidades);
      }
      ).catch((error) => {
        console.log(error);
      });

    }
  }

  FiltrarEspecialistas() {
    this.servSpinner.showWithMessage('st-data-loading', "Cargando datos...");
    let especialistas: Especialista[] = [];
    let aux_especialistas: Especialista[] = JSON.parse(JSON.stringify(this.servUsuario.especialistas.value));
    let aux_especialidades: Especialidad[] = JSON.parse(JSON.stringify(this.servEspecialidad.especialidades.value));

    for (const especialista of aux_especialistas) {
      if (especialista.habilitado == true) {
        if (especialista.especialidades && especialista.especialidades.length > 0) {
          let especialidades: string[] = [];

          for (const especialidad_id of especialista.especialidades) {

            for (const especialidad of aux_especialidades) {
              if (especialidad.id === especialidad_id) {
                if (especialidad.valida === true) {
                  especialidades.push(especialidad.id);
                  break;
                }
              }
            }
          }

          if (especialidades.length > 0) {
            especialista.especialidades = especialidades;
            especialistas.push(especialista);
          }
        }
      }
    }

    this.especialistas = especialistas;

    if (this.ready.especialistas && this.ready.especialidades) {
      this.servSpinner.hideWithMessage('st-data-loading');
    }
  }
}
