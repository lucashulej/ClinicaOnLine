import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-encuesta-paciente',
  templateUrl: './encuesta-paciente.component.html',
  styleUrls: ['./encuesta-paciente.component.scss']
})
export class EncuestaPacienteComponent implements OnInit {

  @Input() turno: Turno;
  @Output() turnoConResenia: EventEmitter<any> = new EventEmitter();
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  salir() {
    this.cancelar.emit();
  }

  guardarEncuesta() {
    if(this.turno.reseniaPaciente != '' && this.turno.reseniaPaciente) {
      this.turnoConResenia.emit(this.turno);
    } else {
      this.error.emit("No puede dejar la encuensta vacia");
    }
  }
}
