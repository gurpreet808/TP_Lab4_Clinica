import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { Paciente } from '../clases/paciente';
import { Especialista } from '../clases/especialista';
import { CollectionReference, DocumentData, Firestore, QuerySnapshot, collection, onSnapshot, doc, setDoc, collectionData, Query, deleteDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { UserCredential } from '@angular/fire/auth';
import { FileHandlerService } from './file-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  pacientes: BehaviorSubject<Paciente[]> = new BehaviorSubject<Paciente[]>([]);
  especialistas: BehaviorSubject<Especialista[]> = new BehaviorSubject<Especialista[]>([]);

  pathUrl: string = 'usuarios';
  dataRef: CollectionReference<DocumentData, DocumentData> = collection(this.firestore, this.pathUrl);

  constructor(private firestore: Firestore, public servAuth: AuthService, public servFile: FileHandlerService) {
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

  async AgregarUsuario(usuario: Usuario) {
    if (usuario === null) {
      return Promise.reject('Usuario nulo');
    };

    if (this.usuarios.value.find((user: Usuario) => user.email === usuario.email)) {
      return Promise.reject('Mail en uso');
    };

    if (this.usuarios.value.find((user: Usuario) => user.dni === usuario.dni)) {
      return Promise.reject('DNI en uso');
    };

    /* let docRef = doc(this.dataRef);
      usuario.id = docRef.id;
      return setDoc(docRef, usuario); */

    let user_id: string = '';

    if (this.servAuth.logueado.value == true) {
      await this.servAuth.RegistrarOtroConEmail(usuario.email, usuario.clave).then(
        async (user_id: string) => {
          user_id = user_id;
          usuario.id = user_id;
          console.log("crear otro usuario", usuario);
          let docRef = doc(this.dataRef, usuario.id);
          await setDoc(docRef, usuario);
        }
      ).catch(
        (error) => {
          console.log(error);
          throw new Error(error);
        }
      );
    } else {
      await this.servAuth.RegistrarConEmail(usuario.email, usuario.clave).then(
        async (userCredential: UserCredential) => {
          user_id = userCredential.user.uid;
          usuario.id = user_id;
          console.log("crear mi usuario", usuario);
          let docRef = doc(this.dataRef, usuario.id);
          await setDoc(docRef, usuario);
        }
      ).catch(
        (error) => {
          console.log(error);
          throw new Error(error);
        }
      );
    }

    return user_id;
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
