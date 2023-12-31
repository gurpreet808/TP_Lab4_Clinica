import { Component, Input, OnInit } from '@angular/core';
import { Paciente } from 'src/app/clases/paciente';
import { Usuario } from 'src/app/clases/usuario';
import { ObraSocialService } from 'src/app/servicios/obra-social.service';

@Component({
  selector: 'app-card-paciente',
  templateUrl: './card-paciente.component.html',
  styleUrls: ['./card-paciente.component.scss']
})
export class CardPacienteComponent implements OnInit {
  @Input() usuario: Usuario | undefined;
  paciente: Paciente | undefined;

  constructor(public servObraSocial: ObraSocialService) {
  }

  ngOnInit(): void {
    this.paciente = this.usuario as Paciente;
  }
}
