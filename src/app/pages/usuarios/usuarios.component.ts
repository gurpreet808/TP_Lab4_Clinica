import { Component, OnInit } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { SpinnerService } from 'src/app/servicios/spinner.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  constructor(public servUsuario: UsuarioService, public servSpinner: SpinnerService) {
    this.servSpinner.showWithMessage('usuarios-init', 'Cargando usuarios...');
  }

  ngOnInit(): void {
    this.servUsuario.usuarios.subscribe(
      (usuarios) => {
        if (this.servUsuario.firstLoad == false) {
          this.servSpinner.hideWithMessage('usuarios-init');
        }
      }
    );
  }

  Borrar(id: string) {
    this.servUsuario.BorrarUsuario(id);
  }

  HabilitarEspecialista(usuario: Usuario) {
    let especialista = usuario as Especialista;
    especialista.habilitado = !especialista.habilitado;
    this.servUsuario.ModificarUsuario(usuario);
  }
}
