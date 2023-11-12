import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = "";
  clave: string = "";

  jugadoresMock = [
    { mail: "admin@admin.com", clave: "admin1234" },
    { mail: "paciente@paciente.com", clave: "paciente1234" },
    { mail: "especialista@especialista.com", clave: "especialista1234" }
  ]

  constructor(public servAuth: AuthService, private router: Router, public messageService: MessageService) {
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
