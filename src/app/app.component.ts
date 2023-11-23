import { Component, OnInit } from '@angular/core';
import { AuthService } from './servicios/auth.service';
import { SpinnerService } from './servicios/spinner.service';
import { skip } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'TPFinalLab4';

  constructor(public servAuth: AuthService, public servSpinner: SpinnerService) {
    this.servSpinner.showWithMessage("app-init", "Cargando...");
  }

  ngOnInit() {
    this.servAuth.logueado.pipe(skip(1)).subscribe(
      (logueado: boolean) => {
        console.log("logueado", logueado);
        this.servSpinner.hideWithMessage("app-init");
      }
    );
  }
}
