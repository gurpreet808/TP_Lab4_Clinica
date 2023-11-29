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

  constructor(
    public servAuth: AuthService,
    public servUsuario: UsuarioService,
    public servEspecialidad: EspecialidadService,
    public servDisponibilidad: DisponibilidadService,
    public servTurno: TurnoService,
    public servSpinner: SpinnerService
  ) {

    this.servAuth.logueado.subscribe(
      (logueado) => {
        if (this.servAuth.usuarioActual && this.servAuth.usuarioActual.tipo === 'paciente') {
          this.paciente = this.servAuth.usuarioActual as Paciente;
          console.log(this.paciente);
        }
      }
    );

    //Hacer como lista de precios 2 suscribes con el Merge() que en este caso filtraría los especiaistas si sus especialidades son válidas y si hay diponibilidad para esa especialidades
    this.servEspecialidad.especialidades.subscribe(
      (especialidades) => {
        this.especialidades = especialidades.filter((especialidad) => especialidad.valida);
      }
    );

    this.servUsuario.especialistas.subscribe(
      (especialistas) => {
        for (let i = 0; i < especialistas.length; i++) {
          if (especialistas[i].habilitado) {

            this.especialistas.push(especialistas[i]);

            /* let especialidades: Especialidad[] = [];
            especialistas[i].especialidades.forEach((id) => {
              let especialidad = this.servEspecialidad.especialidades.value.find((especialidad) => especialidad.id === id);
              if (especialidad && especialidad.valida) {
                especialidades.push(especialidad);
              }
            });

            console.log(especialidades);

            if (especialidades.length > 0) {
              especialistas[i].especialidades = especialidades.map((especialidad) => especialidad.id);
              this.especialistas.push(especialistas[i]);
            } */
          }
        }
      }
    );
  }

  ngOnInit(): void {
  }

  ElegirPaciente(_paciente: Paciente) {
    this.paciente = _paciente;
    console.log(this.paciente);
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
    console.log(this.especialidad_id);

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
    //check if 
  }
}
