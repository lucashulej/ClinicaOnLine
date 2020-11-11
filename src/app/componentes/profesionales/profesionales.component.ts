import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profesionales',
  templateUrl: './profesionales.component.html',
  styleUrls: ['./profesionales.component.scss']
})
export class ProfesionalesComponent implements OnInit {

  @Input() listaProfesionales:any[] = [];
  copiaDeLaLista:any[] = [];
  @Output() profesionalSeleccionado: EventEmitter<any> = new EventEmitter();
  aux = false;

  constructor() { }

  ngOnInit(): void { }
  
  cambioFiltro(e) {
    if(!this.aux && this.listaProfesionales.length > 0) {
      this.copiaDeLaLista = this.listaProfesionales;
      this.aux = true;
    }
    this.listaProfesionales = this.copiaDeLaLista.filter((profesional:any) => {
      if(profesional.apellido.toLowerCase().includes(e.target.value.toLowerCase())) {
        return profesional;
      }
    });
    if(this.listaProfesionales.length == 0) {
      if(e.target.value == "") {
        this.listaProfesionales = this.copiaDeLaLista;
      }
    }
  }

  seleccionarProfesional(profesional) {
    this.profesionalSeleccionado.emit(profesional);
  }
}
