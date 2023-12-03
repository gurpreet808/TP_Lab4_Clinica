import { Injectable } from '@angular/core';
import { Disponibilidad } from '../clases/disponibilidad';
import { DisponibilidadEspecialidad } from '../clases/disponibilidad-especialidad';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadService {

  disponibilidadesClinica: Disponibilidad[] = [
    {
      dia: 1,
      hora_inicio: 8,
      hora_fin: 19
    },
    {
      dia: 2,
      hora_inicio: 8,
      hora_fin: 19
    },
    {
      dia: 3,
      hora_inicio: 8,
      hora_fin: 19
    },
    {
      dia: 4,
      hora_inicio: 8,
      hora_fin: 19
    },
    {
      dia: 5,
      hora_inicio: 8,
      hora_fin: 19
    },
    {
      dia: 6,
      hora_inicio: 8,
      hora_fin: 14
    }
  ];

  constructor() {
  }

  async DisponibilidadesClinicaPorDia(dia: number): Promise<Disponibilidad[]> {
    let disponibilidades: Disponibilidad[] = [];
    for (let i = 0; i < this.disponibilidadesClinica.length; i++) {
      if (this.disponibilidadesClinica[i].dia == dia) {
        disponibilidades.push(this.disponibilidadesClinica[i]);
      }
    }

    if (disponibilidades.length == 0) {
      throw new Error('No hay disponibilidad para ese día');
    }

    return disponibilidades;
  }

  async DisponibilidadTotalClinicaPorDia(dia: number): Promise<Disponibilidad> {
    let disponibilidades: Disponibilidad[] = await this.DisponibilidadesClinicaPorDia(dia);
    if (disponibilidades.length == 0) {
      throw new Error('No hay disponibilidad para ese día');
    }

    let min_hora_inicio: number = disponibilidades[0].hora_inicio;
    let max_hora_fin: number = disponibilidades[0].hora_fin;

    for (let x = 0; x < disponibilidades.length; x++) {
      if (disponibilidades[x].hora_inicio < min_hora_inicio) {
        min_hora_inicio = disponibilidades[x].hora_inicio;
      }

      if (disponibilidades[x].hora_fin > max_hora_fin) {
        max_hora_fin = disponibilidades[x].hora_fin;
      }
    }

    let disponibilidad: Disponibilidad = {
      dia: dia,
      hora_inicio: min_hora_inicio,
      hora_fin: max_hora_fin
    };

    return disponibilidad;
  }

  async DisponibilidadEspecialidadDeEspecialistaPorDia(_dia: number, _especialidad_id: string, _disponibilidades: DisponibilidadEspecialidad[]): Promise<DisponibilidadEspecialidad[]> {
    let disponibilidad: DisponibilidadEspecialidad[] = [];

    for (let i = 0; i < _disponibilidades.length; i++) {
      if (_disponibilidades[i].dia == _dia) {
        disponibilidad.push(_disponibilidades[i]);
      }
    }

    /* if (disponibilidad.length == 0) {
      throw new Error('No hay disponibilidad para ese día');
    } */

    return disponibilidad;
  }
}
