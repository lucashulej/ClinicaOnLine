import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { Usuario } from 'src/app/clases/usuario';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-ver-turno',
  templateUrl: './ver-turno.component.html',
  styleUrls: ['./ver-turno.component.scss']
})
export class VerTurnoComponent implements OnInit {

  @Input() profesional: Profesional;
  @Input() paciente: Usuario;
  @Input() turno: Turno;
  @Input() fotosPaciente: any[];
  @Input() fotosProfesional: any[];
  @Output() cancelar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  salir() {
    this.cancelar.emit();
  }
}
