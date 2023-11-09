import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ObraSocial } from 'src/app/clases/obra-social';
import { ObraSocialService } from 'src/app/servicios/obra-social.service';

@Component({
  selector: 'app-lista-obras-sociales',
  templateUrl: './lista-obras-sociales.component.html',
  styleUrls: ['./lista-obras-sociales.component.scss']
})
export class ListaObrasSocialesComponent implements OnInit {

  obra_social: ObraSocial = {
    id: 'new',
    nombre: ''
  };
  ClonesObrasSociales: { [s: string]: ObraSocial } = {};

  constructor(public servObrasSociales: ObraSocialService, public messageService: MessageService) {

  }

  ngOnInit(): void {
  }

  AgregarObraSocial() {
    this.servObrasSociales.AgregarObraSocial(this.obra_social).then(
      (rdo) => {
        //console.log('Obra social agregada', rdo);
        this.messageService.add({ severity: 'success', life: 10000, summary: 'Bien', detail: 'Se agregó la obra social' });
        this.obra_social = {
          id: 'new',
          nombre: ''
        }
      }
    ).catch(
      (error: any) => {
        console.log(error);
        this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: error });
      }
    );
  }

  ModificarObraSocial() {
    this.servObrasSociales.ModificarObraSocial(this.obra_social).then(
      (rdo) => {
        //console.log('Obra social modificada', rdo);
        this.messageService.add({ severity: 'success', life: 10000, summary: 'Bien', detail: 'Se modificó la obra social' });
        this.obra_social = {
          id: 'new',
          nombre: ''
        }
      }
    ).catch(
      (error: any) => {
        console.log(error);
        this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: error });
      }
    );
  }

  BorrarObraSocial(id: string) {
    this.servObrasSociales.BorrarObraSocial(id).then(
      (rdo) => {
        console.log('Obra social borrada', rdo);
        this.messageService.add({ severity: 'success', life: 10000, summary: 'Bien', detail: 'Se borró la obra social' });
      }
    ).catch(
      (error: any) => {
        console.log(error);
        this.messageService.add({ severity: 'error', life: 10000, summary: 'Error', detail: error });
      }
    );
  }

  onRowEditInit(obra_social: ObraSocial) {
    this.ClonesObrasSociales[obra_social.id as string] = { ...obra_social };
  }

  onRowEditSave(obra_social: ObraSocial) {
    //console.log(obra_social);

    if (obra_social.nombre != '') {
      this.servObrasSociales.ModificarObraSocial(obra_social).then(
        (rdo) => {
          console.log('Obra social modificada', rdo);
          delete this.ClonesObrasSociales[obra_social.id as string];
          this.messageService.add({ severity: 'success', life: 10000, summary: 'Bien', detail: 'Se modificó la obra social' });
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

  onRowEditCancel(obra_social: ObraSocial, index: number) {
    this.servObrasSociales.obras_sociales.value[index] = this.ClonesObrasSociales[obra_social.id as string];
    delete this.ClonesObrasSociales[obra_social.id as string];
    //console.log(this.ClonesObrasSociales);
  }

}
