import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'turnos15Dias'
})
export class Turnos15DiasPipe implements PipeTransform {

  hoy;

  constructor(private datePipe : DatePipe) { 
    let nuevaFecha = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    let year = Number.parseInt(nuevaFecha[0] + nuevaFecha[1] + nuevaFecha[2] + nuevaFecha[3]);
    let month = Number.parseInt(nuevaFecha[5] + nuevaFecha[6]);
    month = month -1;
    let day = Number.parseInt(nuevaFecha[8] + nuevaFecha[9]);
    this.hoy = new Date(year, month, day, 0,0,0,0);
  }

  dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  transform(lista: any[], ...args: unknown[]): unknown {
    let listaAux: any[] = [];
    if(lista?.length > 0) {
      for (const turno of lista) {
        let year = Number.parseInt(turno.fecha[0] + turno.fecha[1] + turno.fecha[2] + turno.fecha[3]);
        let month = Number.parseInt(turno.fecha[5] + turno.fecha[6]);
        month = month -1;
        let day = Number.parseInt(turno.fecha[8] + turno.fecha[9]);
        let fechaTurno = new Date(year, month, day, 0,0,0,0)
  
        let diferenciaEnDias = Math.round(((this.hoy.getTime() - fechaTurno.getTime()) / (1000 * 3600 * 24)));

        if(diferenciaEnDias >= -14 && diferenciaEnDias <= 14) {
          listaAux.push(turno);
        }
      }
    }
    return listaAux;
  }
}
