import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Especialidad } from '../clases/especialidad';
import { CollectionReference, DocumentData, Firestore, Query, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  especialidades: BehaviorSubject<Especialidad[]> = new BehaviorSubject<Especialidad[]>([]);

  pathUrl: string = 'especialidades';
  dataRef: CollectionReference<DocumentData, DocumentData> = collection(this.firestore, this.pathUrl);

  constructor(private firestore: Firestore) {
    this.TraerEspecialidades();
  }

  TraerEspecialidades() {
    let query: Query<Especialidad, DocumentData> = this.dataRef as Query<Especialidad, DocumentData>;

    collectionData<Especialidad>(query, { idField: 'id' }).subscribe(
      (especialidades: Especialidad[]) => {
        this.especialidades.next(especialidades);
      }
    );
  }

  AgregarEspecialidad(especialidad: Especialidad) {
    if (especialidad === null) {
      return Promise.reject('Especialidad nula');
    };

    //if name is already in use
    if (this.especialidades.value.find((os: Especialidad) => os.nombre === especialidad.nombre)) {
      return Promise.reject('Ya se agregó esa especialidad');
    };

    let docRef = doc(this.dataRef);
    especialidad.id = docRef.id;
    return setDoc(docRef, especialidad);
  }

  ModificarEspecialidad(especialidad: Especialidad) {
    if (especialidad === null) {
      return Promise.reject('Especialidad nula');
    };

    let ya_existe = this.especialidades.value.find((es: Especialidad) => es.nombre === especialidad.nombre)
    console.log(ya_existe);

    if (ya_existe && ya_existe.id !== especialidad.id) {
      return Promise.reject('Ya se agregó esa obra social');
    };

    let docRef = doc(this.dataRef, especialidad.id);
    return setDoc(docRef, especialidad);
  }

  BorrarEspecialidad(id: string) {
    if (id === null) {
      return Promise.reject('ID nulo');
    };

    let docRef = doc(this.dataRef, id);
    return deleteDoc(docRef);
  }

  ToogleValidarEspecialidad(especialidad: Especialidad) {
    if (especialidad === null) {
      return Promise.reject('Especialidad nula');
    };

    let docRef = doc(this.dataRef, especialidad.id);
    especialidad.valida = !especialidad.valida;
    return setDoc(docRef, especialidad);
  }
}
