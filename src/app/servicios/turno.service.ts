import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Turno } from '../clases/turno';
import { CollectionReference, DocumentData, Firestore, Query, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { DisponibilidadService } from './disponibilidad.service';
import { DisponibilidadEspecialidad } from '../clases/disponibilidad-especialidad';
import { Disponibilidad } from '../clases/disponibilidad';


@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  turnos: BehaviorSubject<Turno[]> = new BehaviorSubject<Turno[]>([]);
  duracion: number = 30;

  pathUrl: string = 'turnos';
  dataRef: CollectionReference<DocumentData, DocumentData> = collection(this.firestore, this.pathUrl);

  constructor(private firestore: Firestore, public servDisponibilidad: DisponibilidadService) {
    this.TraerTurnos();
  }

  TraerTurnos() {
    let query: Query<Turno, DocumentData> = this.dataRef as Query<Turno, DocumentData>;

    collectionData<Turno>(query, { idField: 'id' }).subscribe(
      (turnos: Turno[]) => {
        turnos.sort(
          (a: Turno, b: Turno) => {
            return a.fecha - b.fecha;
          }
        );

        this.turnos.next(turnos);
      }
    );
  }

  AgregarTurno(turno: Turno) {
    if (turno === null) {
      return Promise.reject('Turno nula');
    };

    if (turno.id_paciente === '') {
      return Promise.reject('No puede pedir un turno sin paciente');
    };

    if (turno.id_especialista === '') {
      return Promise.reject('No puede pedir un turno sin especialista');
    };

    if (turno.fecha === 0) {
      return Promise.reject('No puede pedir un turno sin fecha');
    };

    if (turno.hora === '') {
      return Promise.reject('No puede pedir un turno sin hora');
    };

    if (turno.especialidad === '') {
      return Promise.reject('No puede pedir un turno sin especialidad');
    };

    const turnos = this.turnos.value;
    for (const t of turnos) {
      if (this.sonTurnosIguales(turno, t)) {
        return Promise.reject('Ya se agregó un turno con el mismo paciente, especialista, fecha y hora');
      }
    }

    let docRef = doc(this.dataRef);
    turno.id = docRef.id;
    return setDoc(docRef, turno);
  }

  ModificarTurno(turno: Turno) {
    if (turno === null) {
      return Promise.reject('Turno nula');
    };

    if (turno.id_paciente === '') {
      return Promise.reject('No puede pedir un turno sin paciente');
    };

    if (turno.id_especialista === '') {
      return Promise.reject('No puede pedir un turno sin especialista');
    };

    if (turno.fecha === 0) {
      return Promise.reject('No puede pedir un turno sin fecha');
    };

    if (turno.hora === '') {
      return Promise.reject('No puede pedir un turno sin hora');
    };

    if (turno.especialidad === '') {
      return Promise.reject('No puede pedir un turno sin especialidad');
    };

    if (turno.id === '') {
      return Promise.reject('No puede modificar un turno sin id');
    };

    const turnos = this.turnos.value;
    for (const t of turnos) {
      if (this.sonTurnosIguales(turno, t) && turno.id !== t.id) {
        return Promise.reject('Ya se agregó un turno con el mismo paciente, especialista, fecha y hora');
      }
    }

    let docRef = doc(this.dataRef, turno.id);
    return setDoc(docRef, turno);
  }

  BorrarTurno(id: string): Promise<void> {
    if (id === null) {
      return Promise.reject('ID nulo');
    };

    let docRef = doc(this.dataRef, id);
    return deleteDoc(docRef);
  }

  sonTurnosIguales(turno1: Turno, turno2: Turno): boolean {
    return (
      turno1.id_paciente === turno2.id_paciente &&
      turno1.id_especialista === turno2.id_especialista &&
      (turno1.fecha === turno2.fecha && turno1.hora === turno2.hora)
    );
  }

  ClonarTurno(turno: Turno): Turno {
    return JSON.parse(JSON.stringify(turno));
  }

  async GenerarTurnos(id_paciente: string, id_especialista: string, id_especialidad: string, disponibilidades_especialista: DisponibilidadEspecialidad[], cant_dias: number) {
    let _turnos: Turno[] = [];

    let _fecha_inicio: Date = new Date();
    //_fecha_inicio = new Date("11/30/2023 10:50:00");
    
    if (_fecha_inicio.getMinutes() > 30) {
      _fecha_inicio.setHours(_fecha_inicio.getHours() + 1, 0, 0, 0);
    }
    _fecha_inicio.setHours(_fecha_inicio.getHours() + 1, 0, 0, 0);

    let _fecha_fin: Date = new Date(_fecha_inicio);
    let _fecha_iteracion: Date = new Date(_fecha_inicio);
    _fecha_fin.setDate(_fecha_inicio.getDate() + cant_dias);

    console.log(_fecha_fin);
    //console.log(_fecha_inicio.getDate());
    //console.log(_fecha_inicio.getDay());

    for (let _date = 0; _date < cant_dias + 1; _date++) {
      //console.log(_fecha_iteracion.getDate(), _fecha_iteracion.getDay());

      for (const disponibilidad of disponibilidades_especialista) {
        if (disponibilidad.dia == _fecha_iteracion.getDay()) {
          let disponibilidades_clinica_dia: Disponibilidad[] = await this.servDisponibilidad.DisponibilidadClinicaPorDia(_fecha_iteracion.getDay());

          if (disponibilidades_clinica_dia.length > 0) {
            let hora_inicio: number = disponibilidad.hora_inicio;
            let hora_fin: number = disponibilidad.hora_fin;

            if (_fecha_iteracion.getDate() === _fecha_inicio.getDate()) {
              if (_fecha_inicio.getHours() > hora_inicio) {
                hora_inicio = _fecha_inicio.getHours();
              }
            }

            for (let hora = hora_inicio; hora < hora_fin; hora++) {
              _fecha_iteracion.setHours(hora, 0, 0, 0);
              let _turno_model: Turno = {
                id: "new",
                id_especialista: id_especialista,
                id_paciente: id_paciente,
                estado: 1,
                fecha: _fecha_iteracion.getTime(),
                hora: hora.toString() + ':00',
                especialidad: id_especialidad,
                comentario: {
                  autor: "",
                  texto: ""
                },
                historia_clinica: {
                  altura: 0,
                  peso: 0,
                  temperatura: 0,
                  presion: 0
                }
              };

              //console.log(disponibilidades_clinica_dia);

              for (const disponibilidad_clinica of disponibilidades_clinica_dia) {
                if (hora >= disponibilidad_clinica.hora_inicio && hora < disponibilidad_clinica.hora_fin) {
                  _turnos.push(_turno_model);

                  let _turno: Turno = this.ClonarTurno(_turno_model);
                  _fecha_iteracion.setHours(hora, 30, 0, 0);
                  _turno.fecha = _fecha_iteracion.getTime();
                  _turno.hora = hora.toString() + ':30'
                  _turnos.push(_turno);
                  break;
                }
              }


            }
          }
        }
      }

      _fecha_iteracion.setDate(_fecha_iteracion.getDate() + 1);
    }

    return _turnos;
  }
}
