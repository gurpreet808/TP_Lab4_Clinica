import { Injectable } from '@angular/core';
import { Auth, User, UserCredential, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Usuario } from '../clases/usuario';
import { BehaviorSubject, firstValueFrom, skip } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logueado: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth.currentUser ? true : false);
  usuarioActual: Usuario | undefined;
  emailVerified: boolean = false;
  firstRun: boolean = true;

  constructor(private auth: Auth, private _http: HttpClient, private _usuarioService: UsuarioService) {
    this.auth.onAuthStateChanged(
      async (user: User | null) => {
        //console.log("authStateChange", user);
        this.firstRun = false;

        if (user != null) {
          this.emailVerified = user.emailVerified;
          console.log("emailVerified", this.emailVerified);

          await this.setUsuarioActual(user);
          console.log("usuario actual", this.usuarioActual);

          this.logueado.next(true);
        } else {
          this.logueado.next(false);
        }
      }
    );
  }

  async setUsuarioActual(_user: User) {
    //console.log("enter setUsuarioActual");
    const usuario = await firstValueFrom(this._usuarioService.usuarios.pipe(skip(1)));
    //console.log("usuarios", usuario);
    for (let u = 0; u < usuario.length; u++) {
      //console.log("usuario for", usuario[u]);
      if (usuario[u].id == _user.uid) {
        this.usuarioActual = usuario[u];
        //console.log("usuario actual", this.usuarioActual);
        break;
      }
    }
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
      async (datos: UserCredential) => {
        //console.log(datos);
        await sendEmailVerification(datos.user);
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

  async EnviarVerificacionEmail(): Promise<string> {
    if (this.auth.currentUser) {
      return await sendEmailVerification(this.auth.currentUser).then(
        (datos) => {
          console.log(datos);
          return Promise.resolve("Se envió el mail de verificación");
        }
      ).catch(
        (error) => {
          //console.log(error.code);
          return Promise.reject(this.errorParser(error.code));
        }
      );
    } else {
      return Promise.reject("No hay usuario logueado");
    }
  }

  async RegistrarOtroConEmail(email: string, password: string): Promise<string> {
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
      async (response: any) => {
        console.log(response);
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

  async RegistrarUsuarioConEmail(usuario: Usuario): Promise<Usuario> {
    if (this.logueado.value == true) {
      usuario.id = await this.RegistrarOtroConEmail(usuario.email, usuario.clave).then(
        async (user_id: string) => {
          usuario.id = user_id;
          console.log("crear otro usuario", usuario);
          return usuario.id;
        }
      ).catch(
        (error) => {
          console.log(error);
          throw new Error(error);
        }
      );
    } else {
      usuario.id = await this.RegistrarConEmail(usuario.email, usuario.clave).then(
        async (userCredential: UserCredential) => {
          console.log("registrar user credential", userCredential);
          usuario.id = userCredential.user.uid;
          console.log("crear mi usuario", usuario);
          return usuario.id;
        }
      ).catch(
        (error) => {
          console.log(error);
          throw new Error(error);
        }
      );
    }

    //console.log("usuario ya creado", usuario);

    if (usuario.id != undefined && usuario.id != null && usuario.id != "" && usuario.id != "new") {
      return this._usuarioService.ModificarUsuario(usuario).then(
        () => {
          console.log('Usuario agregado');
          return usuario;
        }
      ).catch(
        (error) => {
          console.log("agregar usuario", error);
          throw new Error(error);
        }
      );
    }

    throw new Error("Error al registrar usuario");
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
