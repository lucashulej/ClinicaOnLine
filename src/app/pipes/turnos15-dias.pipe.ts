import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'turnos15Dias'
})
export class Turnos15DiasPipe implements PipeTransform {

  constructor(private datePipe : DatePipe) { }

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
        let fechaHoy = new Date();
        let diferenciaEnDias = ((fechaTurno.getTime() - fechaHoy.getTime()) / (1000 * 3600 * 24)); 
        if(diferenciaEnDias >= -15 && diferenciaEnDias <= 14) {
          listaAux.push(turno);
        }
      }
    }
    return listaAux;
  }
}
