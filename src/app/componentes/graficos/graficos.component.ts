import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnChanges {

  @Input() grafico;
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() exito: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    Highcharts.chart('graficos', this.grafico);
  }

  descargar() {
    this.exito.emit("Descarga Exitosa");
  }

  salir() {
    this.cancelar.emit();
  }
}
