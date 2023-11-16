import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-card-usuario',
  templateUrl: './card-usuario.component.html',
  styleUrls: ['./card-usuario.component.scss']
})
export class CardUsuarioComponent implements OnInit {
  @Input() usuario: Usuario | undefined;

  constructor() {

  }

  ngOnInit(): void {
  }
}
