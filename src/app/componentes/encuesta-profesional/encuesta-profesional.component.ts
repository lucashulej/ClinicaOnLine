import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-encuesta-profesional',
  templateUrl: './encuesta-profesional.component.html',
  styleUrls: ['./encuesta-profesional.component.scss']
})
export class EncuestaProfesionalComponent implements OnInit {

  @Input() turno: Turno;
  @Output() turnoAtendido: EventEmitter<any> = new EventEmitter();
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  cantidadCamposExtras:number = 0;

  constructor() {}

  ngOnInit(): void {}

  salir() {
    this.cancelar.emit();
  }

  agregarCampo() {
    if(this.cantidadCamposExtras < 3) {
      this.cantidadCamposExtras++;
    }
  }

  guardarEncuesta() {
    if(!this.existenErrores()) {
      this.turno.estado = "Atendido";
      this.turnoAtendido.emit(this.turno);
    } else {
      this.error.emit("Complete los campos");
    }
  }

  existenErrores():boolean {
    let retorno = false;
    switch(this.cantidadCamposExtras) {
      case 1:
        if(this.turno.claveCampo1 == "" || this.turno.valorCampo1 == "") {
          retorno = true;
        }
        break;
      case 2:
        if(this.turno.claveCampo1 == "" || this.turno.valorCampo1 == "" || this.turno.claveCampo2 == "" || this.turno.valorCampo2 == "") {
          retorno = true;
        }
        break;
      case 3:
        if(this.turno.claveCampo1 == "" || this.turno.valorCampo1 == "" || this.turno.claveCampo2 == "" || this.turno.valorCampo2 == "" || this.turno.claveCampo3 == "" || this.turno.valorCampo3 == "") {
          retorno = true;
        }
        break;
      default:
        break;  
    }
    if(this.turno.temperatura == null || this.turno.presion == null || this.turno.edad.toString() == null) {
      retorno = true;
    }
    return retorno;
  }
}
