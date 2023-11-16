import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-card-paciente',
  templateUrl: './card-paciente.component.html',
  styleUrls: ['./card-paciente.component.scss']
})
export class CardPacienteComponent implements OnInit {
  @Input() usuario: Usuario | undefined;
  paciente: Paciente | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.paciente = this.usuario as Paciente;
  }
}
