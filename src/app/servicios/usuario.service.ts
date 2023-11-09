import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { Paciente } from '../clases/paciente';
import { Especialista } from '../clases/especialista';
import { CollectionReference, DocumentData, Firestore, QuerySnapshot, collection, onSnapshot, doc, setDoc, collectionData, Query, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  pacientes: BehaviorSubject<Paciente[]> = new BehaviorSubject<Paciente[]>([]);
  especialistas: BehaviorSubject<Especialista[]> = new BehaviorSubject<Especialista[]>([]);

  pathUrl: string = 'usuarios';
  dataRef: CollectionReference<DocumentData, DocumentData> = collection(this.firestore, this.pathUrl);

  constructor(private firestore: Firestore) {
    this.TraerUsuarios();
  }

  TraerUsuarios() {
    let especialistas: Especialista[] = [];
    let pacientes: Paciente[] = [];

    let query: Query<Usuario, DocumentData> = this.dataRef as Query<Usuario, DocumentData>;

    collectionData<Usuario>(query, { idField: 'id' }).subscribe(
      (usuarios: Usuario[]) => {
        usuarios.forEach(
          (usuario: Usuario) => {
            if (usuario.tipo == 'especialista') {
              especialistas.push(usuario as Especialista);
            } else if (usuario.tipo == 'paciente') {
              pacientes.push(usuario as Paciente);
            }
          }
        );

        this.especialistas.next(especialistas);
        this.pacientes.next(pacientes);
        this.usuarios.next(usuarios);
      }
    );
  }

  AgregarUsuario(usuario: Usuario) {
    if (usuario === null) {
      return Promise.reject('Usuario nulo');
    };

    if (this.usuarios.value.find((user: Usuario) => user.email === usuario.email)) {
      return Promise.reject('Mail en uso');
    };

    if (this.usuarios.value.find((user: Usuario) => user.dni === usuario.dni)) {
      return Promise.reject('DNI en uso');
    };

    let docRef = doc(this.dataRef);
    usuario.id = docRef.id;
    return setDoc(docRef, usuario);
  }

  ModificarUsuario(usuario: Usuario) {
    if (usuario === null) {
      return Promise.reject('Usuario nulo');
    };

    if (this.usuarios.value.find((user: Usuario) => user.email === usuario.email && user.id !== usuario.id)) {
      return Promise.reject('Mail en uso');
    };

    if (this.usuarios.value.find((user: Usuario) => user.dni === usuario.dni && user.id !== usuario.id)) {
      return Promise.reject('DNI en uso');
    };

    let docRef = doc(this.dataRef, usuario.id);
    return setDoc(docRef, usuario);
  }

  BorrarUsuario(id: string) {
    if (id === null) {
      return Promise.reject('ID nulo');
    };

    let docRef = doc(this.dataRef, id);
    return deleteDoc(docRef);
  }

}
