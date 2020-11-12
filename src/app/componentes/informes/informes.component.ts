import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ArchivosService } from '../../servicios/archivos.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.scss']
})
export class InformesComponent implements OnInit {

  dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

  @Input() listaIngresos:any[] = [];
  @Input() listaProfesionales:any[] = [];
  @Input() listaTurnos:any[] = [];
  @Input() listaEspecialidades:any[] = [];
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  mostrarGrafico = false;
  series = [];
  grafico;
  hoy;
  opcion = "";

  constructor(private datePipe:DatePipe, private archivosService:ArchivosService) { 
    let nuevaFecha = this.datePipe.transform(new Date(), "yyyy-MM-dd");
    let year = Number.parseInt(nuevaFecha[0] + nuevaFecha[1] + nuevaFecha[2] + nuevaFecha[3]);
    let month = Number.parseInt(nuevaFecha[5] + nuevaFecha[6]);
    month = month -1;
    let day = Number.parseInt(nuevaFecha[8] + nuevaFecha[9]);
    this.hoy = new Date(year, month, day, 0,0,0,0);
  }

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

  //////////////////////////////////////////////////////////////////////////////////////////////

  turnosPorEspecialidad() {
    this.series = [];
    this.opcion = "turnosPorEspecialidad";
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
    this.cargarTurnosPorEspecialidads();
  }

  cargarTurnosPorEspecialidads() {
    this.options.yAxis.title.text = "Cantidad de operaciones";
    this.options.title.text = "Operacion por especialidad";
    this.mostrarGrafico = true;
    this.grafico = this.options;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

  turnosPorDia() {
    this.series = [];
    this.opcion = "turnosPorDia";
    let turnosPorDia:number = 0;
    for (const diaDeLaSemana of this.dias) {
      for (const turno of this.listaTurnos) {
        let year = Number.parseInt(turno.fecha[0] + turno.fecha[1] + turno.fecha[2] + turno.fecha[3]);
        let month = Number.parseInt(turno.fecha[5] + turno.fecha[6]);
        month = month -1;
        let day = Number.parseInt(turno.fecha[8] + turno.fecha[9]);
        let fecha = new Date(year, month, day, 0,0,0,0)
        let dia = this.dias[fecha.getDay()];
        if(dia == diaDeLaSemana) {
          turnosPorDia++;
        }
      }
      this.series.push({name: diaDeLaSemana, data: [turnosPorDia]});
      console.log({name: diaDeLaSemana, data: [turnosPorDia]});
      this.options.series = this.series;
      turnosPorDia = 0;
    }
    this.cargarTurnosPorDia();
  }

  cargarTurnosPorDia() {
    this.options.yAxis.title.text = "Cantidad de turnos";
    this.options.title.text = "Turnos por dia";
    this.mostrarGrafico = true;
    this.grafico = this.options;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

  turnosPorMedico() {
    this.series = [];
    this.opcion = "turnosPorMedico";
    let turnosPorProfesional:number = 0;
    for (const profesional of this.listaProfesionales) {
      for (const turno of this.listaTurnos) {
        let year = Number.parseInt(turno.fecha[0] + turno.fecha[1] + turno.fecha[2] + turno.fecha[3]);
        let month = Number.parseInt(turno.fecha[5] + turno.fecha[6]);
        month = month -1;
        let day = Number.parseInt(turno.fecha[8] + turno.fecha[9]);
        let fecha = new Date(year, month, day, 0,0,0,0)
        let diferenciaEnDias = Math.round(((this.hoy.getTime() - fecha.getTime()) / (1000 * 3600 * 24)));
        if(diferenciaEnDias <= 7 && diferenciaEnDias >= 0) { 
          if(turno.idProfesional == profesional.id) {
            turnosPorProfesional++;
          }
        }
      }
      let porcentaje = 0;
      porcentaje = (turnosPorProfesional * 100) /  this.listaTurnos.length;
      let porcentajeString = "0." + porcentaje.toString();
      console.log(porcentajeString);
      this.series.push({name: profesional.nombre, data: [Number.parseFloat(porcentajeString)]});
      console.log({name: profesional.nombre, data: [Number.parseFloat(porcentajeString)]});
      this.options.series = this.series;
      turnosPorProfesional = 0;
    }
    this.cargarTurnosPorMedico();
  }

  cargarTurnosPorMedico() {
    this.options.yAxis.title.text = "Porcentaje de turnos por dia (ultima semana)";
    this.options.title.text = "Cantidad de turnos por medico";
    this.mostrarGrafico = true;
    this.grafico = this.options;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

  medicosPorDias() { 
    this.series = [];
    this.opcion = "medicosPorDias";
    let profesionalesPorDia:number = 0;
    let listaProfesionalesDelDia = [];
 
    for (const diaDeLaSemana of this.dias) {
      listaProfesionalesDelDia = [];
      for (const ingreso of this.listaIngresos) {

        let year = Number.parseInt(ingreso.fecha[0] + ingreso.fecha[1] + ingreso.fecha[2] + ingreso.fecha[3]);
        let month = Number.parseInt(ingreso.fecha[5] + ingreso.fecha[6]);
        month = month -1;
        let day = Number.parseInt(ingreso.fecha[8] + ingreso.fecha[9]);
        let fecha = new Date(year, month, day, 0,0,0,0)
        let dia = this.dias[fecha.getDay()];
   
        let diferenciaEnDias = Math.round(((this.hoy.getTime() - fecha.getTime()) / (1000 * 3600 * 24)));
      
        if(diferenciaEnDias <= 7 && diferenciaEnDias >= 0) {
          if(dia == diaDeLaSemana) {
            let id = ingreso.idProfesional;
            if(!listaProfesionalesDelDia.includes(id)) {
              profesionalesPorDia++;
              listaProfesionalesDelDia.push(id);
              console.log(dia + " " + id);
            }
          }
        }
      }
      this.series.push({name: diaDeLaSemana, data: [profesionalesPorDia]});
      console.log({name: diaDeLaSemana, data: [profesionalesPorDia]});
      this.options.series = this.series;
      profesionalesPorDia = 0;
    }
    this.cargarMedicosPorDias();
  }

  cargarMedicosPorDias() {
    this.options.yAxis.title.text = "Cantidad de medicos (ultima semana)";
    this.options.title.text = "Cantidad de medicos que atendieron por dia";
    this.mostrarGrafico = true;
    this.grafico = this.options;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////

  agarrarCancelar() {
    this.mostrarGrafico = false;
  }

  
  salir() {
    this.cancelar.emit();
  }

  agarrarDescargar(modo:string) {
    if(modo == "Excel") {
      switch(this.opcion) {
        case "//":
          //this.archivosService.exportarComoExcel(this.preparaParaDescargar(this.series, 'Especialidad','Cant Operaciones'), 'Operaciones por especialidades');
          break;
        case "turnosPorEspecialidad":
          this.archivosService.exportarComoExcel(this.preparaParaDescargar(this.series, 'Especialidad','Cant Operaciones'), 'Operaciones por especialidades');
          break;
        case "turnosPorDia":
          this.archivosService.exportarComoExcel(this.preparaParaDescargar(this.series, 'Dia','Cant Turnos'), 'Turnos por Dia');
          break;
        case "turnosPorMedico":
          this.archivosService.exportarComoExcel(this.preparaParaDescargar(this.series, 'Medico','Cant Turnos'), 'Turnos por Medico');
          break;
        case "medicosPorDias":
          this.archivosService.exportarComoExcel(this.preparaParaDescargar(this.series, 'Dia','Cant Medicos que Trabajaron'), 'Medicos por dia');
          break;
      }
    } else {
      this.descargarPDF();
    }
  
  }

  preparaParaDescargar(lista, name, nameData){
    return lista.map(dato=>{
      return {[name]:dato.name,[nameData]:dato.data[0]}
    })
  }

  descargarPDF(){
    let aux = [];
    let tittle
    switch(this.opcion){
      case '//':
        tittle =  '//';
        break;
      case 'turnosPorEspecialidad':
        tittle = 'Operaciones por especialidades';
        break;
      case 'turnosPorDia':
        tittle = 'Turnos por Dia';
        break;
      case 'turnosPorMedico':
          tittle = 'Turnos por Medico';
          break;
      case 'medicosPorDias':
        tittle = 'Medicos por dia';
        break;
    }

    var docDefinition = {
      content: [
        tittle,
        {  }
      ]
    };

    for(let serie of this.series)
    {
      aux.push({text: `${serie.name}: ${serie.data[0]}`})
    }

    docDefinition.content[1] = {ul : aux};

    console.log(docDefinition.content[1]);

    pdfMake.createPdf(docDefinition).open();
  }
     
  
}
