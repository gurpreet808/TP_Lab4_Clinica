import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit{
  tipo_usuario: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  SeleccionarTipo(tipo_usuario: string){
    console.log(tipo_usuario);
    this.tipo_usuario = tipo_usuario;
  }
}
