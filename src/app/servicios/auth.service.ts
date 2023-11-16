import { Injectable } from '@angular/core';
import { Auth, User, UserCredential, createUserWithEmailAndPassword, deleteUser, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Usuario } from '../clases/usuario';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logueado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth.currentUser ? true : false);
  usuarioActual: string = "";
  firstRun: boolean = true;

  constructor(private auth: Auth, private _http: HttpClient) {
    this.auth.onAuthStateChanged(
      (user: User | null) => {
        console.log("authStateChange", user);
        this.firstRun = false;

        if (user != null) {
          this.setDatosUsuario(user);
          this.logueado.next(true);
        } else {
          this.logueado.next(false);
        }
      }
    );
  }

  setDatosUsuario(datos: any) {
    /* this.usuarioActual = {
      id: datos.uid,
      email: datos.email || '',
      nombre: datos.displayName || ''
    }; */

    this.usuarioActual = datos.uid;
    //console.log("setCurrentUser", this.usuarioActual);
  }

  async LogInEmail(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password).then(
      (datos) => {
        //console.log(datos);
        return Promise.resolve(datos);
      }
    ).catch(
      (error) => {
        //console.log(error.code);
        throw new Error(this.errorParser(error.code));
      }
    );
  }

  async LogOut() {
    this.logueado.next(false);
    return this.auth.signOut();
  }

  async RegistrarConEmail(email: string, password: string): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(this.auth, email, password).then(
      (datos: UserCredential) => {
        //console.log(datos);
        return datos;
      }
    ).catch(
      (error) => {
        //console.log(error.code);
        return Promise.reject(this.errorParser(error.code));
      }
    );

    //return Promise.reject('Error desconocido');
  }

  async RegistrarOtroConEmail(email: string, password: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `key=${this.auth.app.options.apiKey}`
    };

    //let url: string = 'https://www.googleapis.com/identitytoolkit/v3/accounts';
    let url: string = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + this.auth.app.options.apiKey;

    const body = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    return firstValueFrom(this._http.post(url, body, { headers })).then(
      (response: any) => {
        //console.log(response);
        const ID_USER: string = response.localId;
        //console.log(ID_USER);
        return ID_USER;
      }
    ).catch(
      (error) => {
        console.log(error);
        //console.log(error.error.error.message);
        return Promise.reject(this.errorParser(error.code));
      }
    );
  }

  async OlvideClave(email: string) {
    await sendPasswordResetEmail(this.auth, email).then(
      (datos) => {
        //console.log(datos);
        return Promise.resolve(datos);
      }
    ).catch(
      (error) => {
        //console.log(error.code);
        return Promise.reject(this.errorParser(error.code));
      }
    );
  }

  async BorraUsuario(id: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `key=${this.auth.app.options.apiKey}`
    };

    //let url: string = 'https://www.googleapis.com/identitytoolkit/v3/accounts';
    let url: string = `https://firebase.googleapis.com/v1/projects/${this.auth.app.options.projectId}/users/${id}`;


    return firstValueFrom(this._http.delete(url, { headers })).then(
      (response: any) => {
        //console.log(response);
        const ID_USER: string = response.localId;
        //console.log(ID_USER);
        return ID_USER;
      }
    ).catch(
      (error) => {
        console.log(error);
        //console.log(error.error.error.message);
        return Promise.reject(this.errorParser(error.code));
      }
    );
  }

  errorParser(error: string): string {
    let errorCodes: { [key: string]: string } = {
      "auth/wrong-password": "Clave incorrecta",
      "auth/user-not-found": "No se encontró ese mail",
      "auth/invalid-email": "El mail ingresado no es válido",
      "auth/email-already-in-use": "El mail ingresado ya está en uso",
      "auth/weak-password": "La clave debe tener al menos 6 caracteres",
      "auth/too-many-requests": "Demasiados intentos fallidos. Intente más tarde",
      "auth/network-request-failed": "Error de conexión. Intente más tarde",
      "auth/invalid-login-credentials": "Revise si su mail y contraseña son correctos",
      "auth/missing-password": "Debe ingresar una clave",
      "auth/missing-email": "Debe ingresar un mail",
      "auth/user-disabled": "La cuenta de usuario está deshabilitada",
      "auth/user-not-authorized": "El usuario no tiene permiso para realizar la acción solicitada",
      "auth/quota-exceeded": "Se ha superado el límite de solicitudes",
    };

    return errorCodes[error] || `Error desconocido. (${error})`;
  }
}
