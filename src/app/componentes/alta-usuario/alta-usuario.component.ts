import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.scss']
})
export class AltaUsuarioComponent implements OnInit {

  tiposUsuario: string[] = [
    'admin',
    'paciente',
    'especialista'
  ];
  especialidades: string[] = [];
  especialidad: string = '';
  tipo_usuario: string = '';
  
  constructor() {
  }

  ngOnInit(): void {
  }

}
