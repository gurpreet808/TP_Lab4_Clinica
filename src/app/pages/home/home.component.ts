import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cooldownResend: number = 0;
  resendLabel: string = 'Reenviar mail de verificación';

  constructor(public servAuth: AuthService, public messageService: MessageService) {
  }

  ngOnInit(): void {
  }

  EnviarMailVerificacion() {
    this.servAuth.EnviarVerificacionEmail().then(
      (rta) => {
        console.log(rta);
        this.messageService.add({ severity: 'success', summary: '¡Listo!', detail: 'Se ha enviado un correo de verificación a su casilla de email' });

        //countdown cooldownResend button for 60 seconds
        this.cooldownResend = 60;
        this.resendLabel = `Reenviar mail de verificación (espere ${this.cooldownResend}s)`;

        const interval = setInterval(() => {
          this.cooldownResend--;

          if (this.cooldownResend === 0) {
            clearInterval(interval);
            this.resendLabel = 'Reenviar mail de verificación';
          } else {
            this.resendLabel = `Reenviar mail de verificación (espere ${this.cooldownResend}s)`;
          }
        }, 1000);

      }
    ).catch(
      (error) => {
        this.messageService.add({ severity: 'error', summary: '¡Error!', detail: 'No se pudo enviar el correo de verificación' });
      }
    );
  }

}
