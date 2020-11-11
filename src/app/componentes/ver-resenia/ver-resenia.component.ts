import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-ver-resenia',
  templateUrl: './ver-resenia.component.html',
  styleUrls: ['./ver-resenia.component.scss']
})
export class VerReseniaComponent implements OnInit {

  @Input() tipo: String;
  @Input() turno: Turno;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  salir() {
    this.cancelar.emit();
  }
}
