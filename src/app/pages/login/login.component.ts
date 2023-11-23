import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/servicios/auth.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = "";
  clave: string = "";

  usuariosMock = [
    { nombre: "Esteban Quito", mail: "esteban@cj.MintEmail.com", tipo: "paciente", clave: "1q2w3e4r5t", foto: "https://firebasestorage.googleapis.com/v0/b/tpfinal-lab4-singh.appspot.com/o/images%2Fusuarios%2F1UfYiHuT6R3Ty9Qz4qdQ%2Fhombre2.jpg?alt=media&token=640024f7-65bb-4ac7-ba85-42542cbb53b2" },
    { nombre: "Elsa Pallo", mail: "elsa@cj.MintEmail.com", tipo: "paciente", clave: "1q2w3e4r5t", foto: "https://firebasestorage.googleapis.com/v0/b/tpfinal-lab4-singh.appspot.com/o/images%2Fusuarios%2FlPujIbfTFORdeCVMWE6I5eFE0nz2%2Fmujer1.jpg?alt=media&token=4b466048-2156-4aa9-ac4f-60aa0ab44b85" },
    { nombre: "Elvis Tek", mail: "elvis@cj.MintEmail.com", tipo: "especialista", clave: "1q2w3e4r5t" },
    { nombre: "Armando Paredes", mail: "admin@cj.MintEmail.com", tipo: "admin", clave: "1q2w3e4r5t", foto: "https://firebasestorage.googleapis.com/v0/b/tpfinal-lab4-singh.appspot.com/o/images%2Fusuarios%2FYYk4sbb0nOXhPf2f4xFHUr35B6b2%2Fadmin.jpg?alt=media&token=fac36d7c-63d1-4a47-ae96-db7e4853ecbc" },
  ]

  constructor(public servAuth: AuthService, private router: Router, public messageService: MessageService, public servSpinner: SpinnerService, public servUsuario: UsuarioService) {
    //console.log(servAuth.logueado);
    this.servUsuario.usuarios.subscribe(
      (usuarios) => {
        //console.log(usuarios);
        if (usuarios.length > 0) {
          for (let m = 0; m < this.usuariosMock.length; m++) {
            for (let u = 0; u < usuarios.length; u++) {
              if (this.usuariosMock[m].mail == usuarios[u].email) {
                this.usuariosMock[m].foto = usuarios[u].url_foto_1;
              }
            }
          }
        }
      }
    );
  }

  ngOnInit(): void {
  }

  Login() {
    //console.log("login");
    this.servAuth.LogInEmail(this.email, this.clave).then(
      (res) => {
        //console.log(res);
        this.messageService.add({ severity: 'success', life: 10000, summary: 'Bienvenido', detail: "Iniciaste sesión" });
        this.servSpinner.showWithMessage("login", "Iniciando sesión...");
        this.router.navigate(['/']);
      }
    ).catch(
      (err) => {
        console.log(err.message);
        this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: err.message });
      }
    );
  }

  Registrarme() {
    this.router.navigate(['/registrarse']);
  }

  OlvideClave() {
    console.log("olvide clave");
    this.servAuth.OlvideClave(this.email).then(
      (res) => {
        console.log(res);
        this.messageService.add({ severity: 'success', life: 10000, summary: 'Listo', detail: "Se envió un correo a " + this.email + " para que puedas recuperar tu contraseña. Revisa SPAM por las dudas." });
      }
    ).catch(
      (err) => {
        console.log(err);
        this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: err.message });
      }
    );
  }

  LoginMock(mail: string, clave: string) {
    this.email = mail;
    this.clave = clave;
  }

}
