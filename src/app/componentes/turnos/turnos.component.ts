import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss']
})
export class TurnosComponent implements OnInit {

  @Input() listaTurnos:any[] = [];
  copiaDeLaLista:any[] = [];
  @Output() turnoSeleccionado: EventEmitter<any> = new EventEmitter();
  aux = false;
  dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  constructor() { }

  ngOnInit(): void {}

  cambioFiltro(e) {
    if(!this.aux && this.listaTurnos.length > 0) {
      this.copiaDeLaLista = this.listaTurnos;
      this.aux = true;
    }
    this.listaTurnos = this.copiaDeLaLista.filter((turno:any) => {
      let year = Number.parseInt(turno.fecha[0] + turno.fecha[1] + turno.fecha[2] + turno.fecha[3]);
      let month = Number.parseInt(turno.fecha[5] + turno.fecha[6]);
      month = month -1;
      let day = Number.parseInt(turno.fecha[8] + turno.fecha[9]);
      let fecha = new Date(year, month, day, 0,0,0,0)
      let dia = this.dias[fecha.getDay()];
      if(dia.toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }
    });
    if(this.listaTurnos.length == 0) {
      if(e.target.value == "") {
        this.listaTurnos = this.copiaDeLaLista;
      }
    }
  }


  seleccionarTurno(turno) {
    this.turnoSeleccionado.emit(turno);
  }
}
