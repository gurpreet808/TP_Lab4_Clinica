import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { Paciente } from '../clases/paciente';
import { Especialista } from '../clases/especialista';
import { CollectionReference, DocumentData, Firestore, QuerySnapshot, collection, onSnapshot, doc, setDoc, collectionData, Query, deleteDoc } from '@angular/fire/firestore';
import { FileHandlerService } from './file-handler.service';
import { DisponibilidadEspecialidad } from '../clases/disponibilidad-especialidad';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  admins: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  pacientes: BehaviorSubject<Paciente[]> = new BehaviorSubject<Paciente[]>([]);
  especialistas: BehaviorSubject<Especialista[]> = new BehaviorSubject<Especialista[]>([]);
  firstLoad: boolean = true;

  pathUrl: string = 'usuarios';
  dataRef: CollectionReference<DocumentData, DocumentData> = collection(this.firestore, this.pathUrl);

  constructor(private firestore: Firestore, public servFile: FileHandlerService) {
    this.TraerUsuarios();
  }

  TraerUsuarios() {
    let especialistas: Especialista[] = [];
    let pacientes: Paciente[] = [];
    let admins: Usuario[] = [];

    let query: Query<Usuario, DocumentData> = this.dataRef as Query<Usuario, DocumentData>;
    collectionData<Usuario>(query, { idField: 'id' }).subscribe(
      (usuarios: Usuario[]) => {
        //console.log("usuarios", usuarios);

        usuarios.forEach(
          (usuario: Usuario) => {
            if (usuario.tipo == 'especialista') {
              if ((usuario as Especialista).disponibilidades == undefined) {
                (usuario as Especialista).disponibilidades = [];
              }

              especialistas.push(usuario as Especialista);
            }

            if (usuario.tipo == 'paciente') {
              pacientes.push(usuario as Paciente);
            }

            if (usuario.tipo == 'admin') {
              admins.push(usuario);
            }
          }
        );

        this.firstLoad = false;

        this.especialistas.next(especialistas);
        this.pacientes.next(pacientes);
        this.admins.next(admins);

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

  async BorrarUsuario(id: string) {
    if (id === null) {
      return Promise.reject('ID nulo');
    };

    /* await this.servAuth.BorraUsuario(id).then(
      (rta) => {
        console.log(rta);
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    ); */

    let docRef = doc(this.dataRef, id);
    return deleteDoc(docRef);
  }

  async BuscarUsuarioPorId(id: string): Promise<Usuario> {
    if (id === null) {
      return Promise.reject('ID nulo');
    };

    let aux_usuarios: Usuario[] = JSON.parse(JSON.stringify(this.usuarios.value));

    for (let i = 0; i < aux_usuarios.length; i++) {
      if (aux_usuarios[i].id == id) {
        return aux_usuarios[i];
      }
    }

    throw new Error('Usuario no encontrado');
  }

  ExisteMail(mail: string): boolean {
    let rta: boolean = false;
    let aux_usuarios: Usuario[] = JSON.parse(JSON.stringify(this.usuarios.value));

    for (let i = 0; i < aux_usuarios.length; i++) {
      if (aux_usuarios[i].email == mail) {
        rta = true;
        break;
      }
    }

    return rta;
  }

}
