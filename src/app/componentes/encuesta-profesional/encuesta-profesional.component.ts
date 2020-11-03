import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';

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

  //edad:number = 0;
  //temperatura:number = 37.5;
  //presion:number = 100;
  //resenia:string = "";

  cantidadCamposExtras:number = 0;

  /*
  claveCampo1:string = "";
  valorCampo1:string = "";
  claveCampo2:string = "";
  valorCampo2:string = "";
  claveCampo3:string = "";
  valorCampo3:string = "";
  */

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
      this.error.emit("Si agrego un campo debe completarlo");
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
    return retorno;
  }
}
