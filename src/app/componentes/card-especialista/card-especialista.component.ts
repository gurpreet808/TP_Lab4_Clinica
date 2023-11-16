import { Component, Input, OnInit } from '@angular/core';
import { Especialista } from 'src/app/clases/especialista';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-card-especialista',
  templateUrl: './card-especialista.component.html',
  styleUrls: ['./card-especialista.component.scss']
})
export class CardEspecialistaComponent implements OnInit {
  @Input() usuario: Usuario | undefined;
  especialista: Especialista | undefined;

  constructor() {
  }

  ngOnInit(): void {
    this.especialista = this.usuario as Especialista;
  }

}
