import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Ingreso } from '../clases/ingreso';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  constructor(private db : AngularFireDatabase, private datePipe : DatePipe) {}

  nuevoIngreso(idProfesional) {
    let ingreso = new Ingreso();
    ingreso.id  = '_' + Math.random().toString(36).substr(2, 9); 
    ingreso.idProfesional = idProfesional;
    let hoy = new Date();
    let hora, minutos , segundos;
    if(hoy.getHours() < 10) {
      hora = "0" + hoy.getHours();
    } else {
      hora = hoy.getHours();
    }
    if(hoy.getMinutes() < 10) {
      minutos = "0" + hoy.getMinutes();
    } else {
      minutos = hoy.getMinutes();
    }
    if(hoy.getSeconds() < 10) {
      segundos = "0" + hoy.getSeconds();
    } else {
      segundos = hoy.getSeconds();
    }
    ingreso.horario = hora + '-' + minutos + '-' + segundos;
    let nuevaFecha = this.datePipe.transform(hoy, "yyyy-MM-dd");
    ingreso.fecha = nuevaFecha;
    let year = Number.parseInt(nuevaFecha[0] + nuevaFecha[1] + nuevaFecha[2] + nuevaFecha[3]);
    let month = Number.parseInt(nuevaFecha[5] + nuevaFecha[6]);
    month = month -1;
    let day = Number.parseInt(nuevaFecha[8] + nuevaFecha[9]);
    let nuevaFechaAux = new Date(year, month, day, 0,0,0,0);
    ingreso.dia = this.dias[nuevaFechaAux.getDay()];
    this.db.list('ingresos').set(ingreso.id, ingreso); 
    console.log()
  }
}
