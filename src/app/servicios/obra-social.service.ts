import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ObraSocial } from '../clases/obra-social';
import { CollectionReference, DocumentData, Firestore, Query, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ObraSocialService {

  obras_sociales: BehaviorSubject<ObraSocial[]> = new BehaviorSubject<ObraSocial[]>([]);

  pathUrl: string = 'obras_sociales';
  dataRef: CollectionReference<DocumentData, DocumentData> = collection(this.firestore, this.pathUrl);

  constructor(private firestore: Firestore) {
    this.TraerObrasSociales();
  }

  TraerObrasSociales() {
    let query: Query<ObraSocial, DocumentData> = this.dataRef as Query<ObraSocial, DocumentData>;

    collectionData<ObraSocial>(query, { idField: 'id' }).subscribe(
      (obras_sociales: ObraSocial[]) => {
        this.obras_sociales.next(obras_sociales);
      }
    );
  }

  AgregarObraSocial(obraSocial: ObraSocial) {
    if (obraSocial === null) {
      return Promise.reject('Obra Social nula');
    };

    if (obraSocial.nombre === '') {
      return Promise.reject('Nombre de obra social vacío');
    };

    if (this.obras_sociales.value.find((os: ObraSocial) => os.nombre === obraSocial.nombre)) {
      return Promise.reject('Ya se agregó esa obra social');
    };

    let docRef = doc(this.dataRef);
    obraSocial.id = docRef.id;
    return setDoc(docRef, obraSocial);
  }

  ModificarObraSocial(obraSocial: ObraSocial) {
    if (obraSocial === null) {
      return Promise.reject('Obra Social nula');
    };

    let ya_existe = this.obras_sociales.value.find((os: ObraSocial) => os.nombre === obraSocial.nombre)
    console.log(ya_existe);

    if (ya_existe && ya_existe.id !== obraSocial.id) {
      return Promise.reject('Ya se agregó esa obra social');
    };

    let docRef = doc(this.dataRef, obraSocial.id);
    return setDoc(docRef, obraSocial);
  }

  BorrarObraSocial(id: string): Promise<void> {
    if (id === null) {
      return Promise.reject('ID nulo');
    };

    let docRef = doc(this.dataRef, id);
    return deleteDoc(docRef);
  }

  ClonarObraSocial(obraSocial: ObraSocial): ObraSocial {
    return JSON.parse(JSON.stringify(obraSocial));
  }

}
