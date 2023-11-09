import { Component } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  constructor(public servUsuario: UsuarioService) {

  }

  AgregarAdmin() {
    let _admin: Usuario = {
      id: 'admin',
      nombre: 'admin',
      apellido: 'admin',
      email: 'admin' + Math.floor(Math.random() * 1000) + '@admin.com',
      clave: 'admin',
      tipo: 'admin',
      url_foto_1: 'admin',
      dni: Math.floor(Math.random() * 100000000),
      email_verificado: true,
      edad: 20,
      fecha_alta: new Date().getTime(),
      fecha_modificacion: new Date().getTime()
    }

    this.servUsuario.AgregarUsuario(_admin);
  }

  AgregarPaciente() {
    let _paciente: Paciente = {
      id: 'paciente',
      nombre: 'paciente',
      apellido: 'paciente',
      email: 'paciente' + Math.floor(Math.random() * 1000) + '@paciente.com',
      clave: 'paciente',
      tipo: 'paciente',
      url_foto_1: 'url_1',
      dni: Math.floor(Math.random() * 100000000),
      email_verificado: true,
      edad: 20,
      fecha_alta: new Date().getTime(),
      fecha_modificacion: new Date().getTime(),
      obra_social: 'osde',
      url_foto_2: 'url_2',
    }

    this.servUsuario.AgregarUsuario(_paciente);
  }

  AgregarEspecialista() {
    let _especialista: Especialista = {
      id: 'especialista',
      nombre: 'especialista',
      apellido: 'especialista',
      email: 'especialista' + Math.floor(Math.random() * 1000) + '@especialista.com',
      clave: 'especialista',
      tipo: 'especialista',
      url_foto_1: 'url_1',
      dni: Math.floor(Math.random() * 100000000),
      email_verificado: true,
      edad: 20,
      fecha_alta: new Date().getTime(),
      fecha_modificacion: new Date().getTime(),
      especialidades: ['dentista', 'cardiologo'],
      habilitado: true
    }

    this.servUsuario.AgregarUsuario(_especialista);
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
