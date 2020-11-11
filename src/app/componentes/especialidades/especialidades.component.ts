import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.scss']
})
export class EspecialidadesComponent implements OnInit {

  @Input() listaEspecialidades:[] = [];
  @Output() especialidadSeleccionada: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  seleccionarEspecialidad(especialidad) {
    this.especialidadSeleccionada.emit(especialidad);
  }
}
