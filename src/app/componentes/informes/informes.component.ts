import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {

  @Input() listaTurnos:any[] = [];
  @Input() listaEspecialidades:any[] = [];
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  mostrarGrafico = false;
  series = [];
  grafico;
  
  constructor() { }

  ngOnInit(): void {}

  options:any = {
    chart: {
      type: 'bar',
      /* height: '90%',
      width: '100%', */
      backgroundColor: 'white',
      plotBackgroundColor: 'rgb(255, 255, 210)',
      plotShadow: true,
      plotBorderWidth: 1
    },
    title: {
      text: 'Sample Scatter Plot'
    },
    credits: {
      enabled: false
    },
    tooltip: {
      formatter: function() {
        return Highcharts.format('cantidad', this.x)+ ": " + this.y;
      }
    },
    xAxis: {
      type: 'string',
      labels: {
        formatter: function() {
          
        }
      }
    },
    yAxis:{
      title:{
        text:""
      }
    },
    series: []//this.series 
  }

  informe(opcion) {
    
  }

  turnosPorEspecialidad() {
    this.series = [];
    let turnosPorEspecialidad:number = 0;
    for (const especialidad of this.listaEspecialidades) {
      for (const turno of this.listaTurnos) {
        if(turno.especialidad == especialidad) {
          turnosPorEspecialidad++;
        }
      }
      this.series.push({name: especialidad, data: [turnosPorEspecialidad]});
      console.log({name: especialidad, data: [turnosPorEspecialidad]});
      this.options.series = this.series;
      turnosPorEspecialidad = 0;
    }
    this.cargarCharEspecialidades();
  }

  cargarCharEspecialidades() {
    this.options.yAxis.title.text = "Cantidad de operaciones";
    this.options.title.text = "Operacion por especialidad";
    this.mostrarGrafico = true;
    this.grafico = this.options;
    //Highcharts.chart('graficos', this.options);
  }

  agarrarCancelar() {
    this.mostrarGrafico = false;
  }

  salir() {
    this.cancelar.emit();
  }
}
