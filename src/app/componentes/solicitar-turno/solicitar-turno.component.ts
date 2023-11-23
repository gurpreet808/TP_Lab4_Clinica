import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs';
import { Especialista } from 'src/app/clases/especialista';
import { DisponibilidadService } from 'src/app/servicios/disponibilidad.service';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  especialistas: Especialista[] = [];
  especialista: Especialista | undefined;
  especialidad: string = '';

  constructor(
    public servUsuario: UsuarioService,
    public servEspecialidad: EspecialidadService,
    public servDisponibilidad: DisponibilidadService,
    public servTurno: TurnoService
  ) {
    //suscribe to this.servUsuario.especialistas and set this.especialistas, but only if they are habilitado == true
    this.servUsuario.especialistas.subscribe(
      (especialistas) => {
        this.especialistas = especialistas.filter(
          (especialista) => {
            return especialista.habilitado;
          }
        );
      }
    );
  }

  ngOnInit(): void {
  }

  ElegirEspecialista(_especialista: Especialista) {
    this.especialista = _especialista;
    console.log(this.especialista);
  }

  ElegirEspecialidad(_especialidad: string) {
    this.especialidad = _especialidad;
    console.log(this.especialidad);

    if (this.especialista && this.especialista.disponibilidades && this.especialista.disponibilidades.length > 0 && this.especialidad) {

      this.servDisponibilidad.DisponibilidadEspecialidadDeEspecialistaPorDia(1, this.especialidad, this.especialista.disponibilidades).then((disponibilidades) => {
        console.log(disponibilidades);
      }
      ).catch((error) => {
        console.log(error);
      });

    }
  }
}
