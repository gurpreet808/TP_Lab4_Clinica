import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Especialidad } from 'src/app/clases/especialidad';
import { EspecialidadService } from 'src/app/servicios/especialidad.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {
  especialidad: string = '';
  ClonesEspecialidades: { [s: string]: Especialidad } = {};

  constructor(public servEspecialidades: EspecialidadService, public messageService: MessageService, public servSpinner: SpinnerService,) {
    this.servSpinner.showWithMessage('especialidades-init', 'Cargando especialidades...');
  }
  
  ngOnInit(): void {
    this.servEspecialidades.especialidades.subscribe(
      (especialidades) => {
        if (this.servEspecialidades.firstLoad == false) {
          this.servSpinner.hideWithMessage('especialidades-init');
        }
      }
    );
  }

  AgregarEspecialidad() {
    let _especialidad = {
      id: 'new',
      nombre: this.especialidad,
      valida: true
    }

    this.servEspecialidades.AgregarEspecialidad(_especialidad).then(
      (rdo) => {
        //console.log('Especialidad agregada', rdo);
        this.messageService.add({ severity: 'success', life: 10000, summary: 'Bien', detail: 'Se agregó la especialidad' });
        this.especialidad = '';
      }
    ).catch(
      (error: any) => {
        console.log(error);
        this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: error });
      }
    );
  }

  ModificarEspecialidad(_especialidad: Especialidad) {
    this.servEspecialidades.ModificarEspecialidad(_especialidad).then(
      (rdo) => {
        //console.log('Especialidad modificada', rdo);
        this.messageService.add({ severity: 'success', life: 10000, summary: 'Bien', detail: 'Se modificó la especialidad' });
      }
    ).catch(
      (error: any) => {
        console.log(error);
        this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: error });
      }
    );
  }

  BorrarEspecialidad(id: string) {
    this.servEspecialidades.BorrarEspecialidad(id).then(
      (rdo) => {
        console.log('Especialidad borrada', rdo);
        this.messageService.add({ severity: 'success', life: 10000, summary: 'Bien', detail: 'Se borró la especialidad' });
      }
    ).catch(
      (error: any) => {
        console.log(error);
        this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: error });
      }
    );
  }

  onRowEditInit(especialidad: Especialidad) {
    this.ClonesEspecialidades[especialidad.id as string] = { ...especialidad };
  }

  onRowEditSave(especialidad: Especialidad) {
    //console.log(especialidad);

    if (especialidad.nombre != '') {
      this.servEspecialidades.ModificarEspecialidad(especialidad).then(
        (rdo) => {
          console.log('Especialidad modificada', rdo);
          delete this.ClonesEspecialidades[especialidad.id as string];
          this.messageService.add({ severity: 'success', life: 10000, summary: 'Bien', detail: 'Se modificó la especialidad' });
        }
      ).catch(
        (error: any) => {
          console.log(error);
          this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: error.message });
        }
      );
    } else {
      this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: 'El nombre no puede estar vacío' });
    }
  }

  onRowEditCancel(especialidad: Especialidad, index: number) {
    this.servEspecialidades.especialidades.value[index] = this.ClonesEspecialidades[especialidad.id as string];
    delete this.ClonesEspecialidades[especialidad.id as string];
    //console.log(this.ClonesEspecialidades);
  }

  ValidarEspecialidad(especialidad: Especialidad) {
    especialidad.valida = true;

    this.servEspecialidades.ModificarEspecialidad(especialidad).then(
      (rdo) => {
        console.log('Especialidad validada', rdo);
        this.messageService.add({ severity: 'success', life: 10000, summary: 'Bien', detail: 'Se validó la especialidad' });
      }
    ).catch(
      (error: any) => {
        console.log(error);
        this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: error.message });
      }
    );
  }

}