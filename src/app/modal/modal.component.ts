import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { ViajeService } from '../viaje/viaje.service';
import { NotifierService } from 'angular-notifier';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { DiaViaje } from '../viaje/viaje-data';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  viajes: any[] = [];
  filtroDia: string = '';
  filtroCiudad: string = '';
  detalleViaje: any | null = null;
  viajeData: DiaViaje[] | undefined;
  formularioViaje: FormGroup;

  constructor(
    public modalRef: MdbModalRef<ModalComponent>,
    private viajeService: ViajeService,
    private notifier: NotifierService,
    private formBuilder: FormBuilder
  ) {
    this.notifier = notifier;
    this.formularioViaje = this.formBuilder.group({
      codigo: '',
      dia: '',
      nombre: '',
      ciudad: '',
      alojamiento: '',
      actividades: '',
      descripcion: '',
      video: '',
      imagen: '',
    });
  }

  mostrarNotificacion(tipo: string, mensaje: string): void {
    this.notifier.notify(tipo, mensaje);
  }

  addViaje(nuevoViaje: DiaViaje) {
    this.viajeService
      .addViaje(nuevoViaje)
      .then((resultado: boolean) => {
        if (resultado) {
          this.mostrarNotificacion('success', 'Elemento añadido correctamente');
          this.viajes.push(nuevoViaje);
        } else {
          this.mostrarNotificacion('error', 'Error al añadir el elemento');
        }
      })
      .catch((error: any) => {
        this.mostrarNotificacion(
          'error',
          'Error inesperado al añadir el elemento'
        );
        console.error('Error inesperado: ', error);
      });
  }

  // Método para manejar la acción de envío del formulario
  onSubmit() {
    if (this.formularioViaje.valid) {
      const nuevoViaje: DiaViaje = this.formularioViaje.value;
      this.addViaje(nuevoViaje);
    } else {
    }
  }
}
