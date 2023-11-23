import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/servicios/auth.service';
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
    { mail: "esteban@cj.MintEmail.com", clave: "1q2w3e4r5t", foto: "https://firebasestorage.googleapis.com/v0/b/tpfinal-lab4-singh.appspot.com/o/images%2Fusuarios%2F1UfYiHuT6R3Ty9Qz4qdQ%2Fhombre2.jpg?alt=media&token=640024f7-65bb-4ac7-ba85-42542cbb53b2" },
    { mail: "elsa@cj.MintEmail.com", clave: "1q2w3e4r5t", foto: "https://firebasestorage.googleapis.com/v0/b/tpfinal-lab4-singh.appspot.com/o/images%2Fusuarios%2FlPujIbfTFORdeCVMWE6I5eFE0nz2%2Fmujer1.jpg?alt=media&token=4b466048-2156-4aa9-ac4f-60aa0ab44b85" },
    { mail: "armando@cj.MintEmail.com", clave: "1q2w3e4r5t", foto: "https://firebasestorage.googleapis.com/v0/b/tpfinal-lab4-singh.appspot.com/o/images%2Fusuarios%2FfxZjNPmfyaXvxz1m48V3ArUamdC3%2Fhombre1.jpg?alt=media&token=ad91e8f6-a9ed-4047-974a-ff840cf38128" },
    { mail: "admin@cj.MintEmail.com", clave: "1q2w3e4r5t", foto: "https://firebasestorage.googleapis.com/v0/b/tpfinal-lab4-singh.appspot.com/o/images%2Fusuarios%2FYYk4sbb0nOXhPf2f4xFHUr35B6b2%2Fadmin.jpg?alt=media&token=fac36d7c-63d1-4a47-ae96-db7e4853ecbc" },
    { mail: "especialista@especialista.com", clave: "especialista1234" }
  ]

  constructor(public servAuth: AuthService, private router: Router, public messageService: MessageService, public servSpinner: MessageService, public servUsuario: UsuarioService) {
    //console.log(servAuth.logueado);
  }

  ngOnInit(): void {
  }

  Login() {
    //console.log("login");
    this.servAuth.LogInEmail(this.email, this.clave).then(
      (res) => {
        //console.log(res);
        this.messageService.add({ severity: 'success', life: 10000, summary: 'Bienvenido', detail: "Iniciaste sesión" });
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
