import { Component, Input, OnInit } from '@angular/core';
import { Disponibilidad } from 'src/app/clases/disponibilidad';
import { DisponibilidadEspecialidad } from 'src/app/clases/disponibilidad-especialidad';

@Component({
  selector: 'app-ver-disponibilidad',
  templateUrl: './ver-disponibilidad.component.html',
  styleUrls: ['./ver-disponibilidad.component.scss']
})
export class VerDisponibilidadComponent implements OnInit {
  @Input() public disponibilidad: Disponibilidad[] = [];
  @Input() public disponibilidadEspecialista: DisponibilidadEspecialidad[] = [];

  displayDisponibilidad: {
    [key: number]: DisponibilidadEspecialidad[]
  } = {};

  dias: number[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.disponibilidad);
    console.log(this.disponibilidadEspecialista);

    if (this.disponibilidadEspecialista) {
      for (let d = 0; d < this.disponibilidadEspecialista.length; d++) {
        //check if the day is already in the array if not push it
        if (!this.dias.includes(this.disponibilidadEspecialista[d].dia)) {
          this.dias.push(this.disponibilidadEspecialista[d].dia);
        }

        //check if the day is already in the object if not create it
        if (!this.displayDisponibilidad[this.disponibilidadEspecialista[d].dia]) {
          this.displayDisponibilidad[this.disponibilidadEspecialista[d].dia] = [];
        }

        //push the disponibilidad to the object
        this.displayDisponibilidad[this.disponibilidadEspecialista[d].dia].push(this.disponibilidadEspecialista[d]);
      }
    }
  }

}
