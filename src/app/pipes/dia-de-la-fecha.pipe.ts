import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diaDeLaFecha'
})
export class DiaDeLaFechaPipe implements PipeTransform {

  dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  transform(lista: any, ...args: unknown[]): unknown {
    if(lista?.length > 0) { 
      for (const turno of lista) {
        let year = Number.parseInt(turno.fecha[0] + turno.fecha[1] + turno.fecha[2] + turno.fecha[3]);
        let month = Number.parseInt(turno.fecha[5] + turno.fecha[6]);
        month = month -1;
        let day = Number.parseInt(turno.fecha[8] + turno.fecha[9]);
        let fecha = new Date(year, month, day, 0,0,0,0)
        turno.dia = this.dias[fecha.getDay()];
      }
    }
    return lista;
  }
}
