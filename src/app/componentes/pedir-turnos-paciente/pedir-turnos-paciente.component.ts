import { Component, OnInit, EventEmitter, Output, ɵConsole } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno } from 'src/app/clases/turno';
import { Profesional } from 'src/app/clases/profesional';
import { Usuario } from 'src/app/clases/usuario';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pedir-turnos-paciente',
  templateUrl: './pedir-turnos-paciente.component.html',
  styleUrls: ['./pedir-turnos-paciente.component.scss']
})
export class PedirTurnosPacienteComponent implements OnInit {

  @Output() error: EventEmitter<any> = new EventEmitter();
  @Output() exito: EventEmitter<any> = new EventEmitter();
  @Output() cancelar: EventEmitter<any> = new EventEmitter();

  especialidades: Observable<any[]>;
  listaEspecialidades: any[];

  turno: Turno = new Turno();
  turnos: Observable<any[]>;
  listaTurnos: any[];
  listaTurnosPorProfesionales: any[];
  
  profesionales: Observable<any[]>;
  listaProfesionales: any[];
  listaProfesionalesPorEspecialidad: any[];

  vistaTabla:string = "Apellido";
  filtroSemana = "";
  filtroEspecialidad = "";

  profesionalSeleccionado:Profesional;
  turnoSeleccionado:Turno;
  listaDias: string[];
  fechaSeleccionada: Date;
  miUsuario:Usuario;
  dias = ["Domingos", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabados"];
  horarioSeleccionado = "";
  especialidadSeleccionada = "";
  fechaMin = "2020-05-01";
  fechaMax = "2020-11-15";

  horariosSemanal = ["08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"];
  horariosSabados = ["08:00","09:00","10:00","11:00","12:00","13:00"];

  constructor(private db : AngularFireDatabase, private turnosService:TurnosService, private authService:AuthService, private datePipe : DatePipe) { 
    
    this.fechaSeleccionada = new Date();

    this.especialidades = this.db.list('especialidades').valueChanges(); 
    this.especialidades.subscribe(especialidades => {
      this.listaEspecialidades = especialidades;
    }, error => console.log(error));

    this.authService.obtenerUsuario().then((usuarioFire:any)=>{
      this.profesionales = this.db.list('usuarios').valueChanges(); 
      this.profesionales.subscribe(profesionales => {      
        this.listaProfesionales = profesionales;
        for (const usuario of this.listaProfesionales) {
          if(usuario.id == usuarioFire.uid) {
            this.miUsuario = usuario;
            break;
          }
        }
        this.listaProfesionales = this.listaProfesionales.filter(profesional => profesional.habilitado == true);
      }, error => console.log(error));
    }).catch((error:any)=>console.log(error));
    
    this.turnos = this.db.list('turnos').valueChanges(); 
    this.turnos.subscribe(turnos => {
      this.listaTurnos = turnos;
      this.listaTurnos = this.listaTurnos.filter(turno => {
        if(turno.estado == "Pendiente" || turno.estado == "Aceptado" || turno.estado == "Atendido") {
          return turno;
        }
      });
    }, error => console.log(error));
  }

  ngOnInit(): void { }

  agarrarEspecialidadSeleccionada(especialidad) {
    this.especialidadSeleccionada = especialidad;
    this.listaTurnosPorProfesionales = null;
    this.listaProfesionalesPorEspecialidad = this.listaProfesionales.filter(profesional => {
      if(profesional.especialidades.includes(especialidad)) {
        return profesional;
      }
    });
    if(this.listaProfesionalesPorEspecialidad.length == 0) {
      this.error.emit('No existe ningun profesional habilitado con esa especialidad');
    }
  }

  agarrarProfesionalSeleccionado(profesional) {
    let listaTurnosProfesional = this.listaTurnos.filter(turno => turno.idProfesional == profesional.id);
    this.llenarListaDeDias(profesional);
    this.crearTurnosDisponibles(profesional, listaTurnosProfesional);
  }
  
  agarrarTurnoSeleccionado(turno) {
    this.turnosService.nuevoTurno(turno);
    this.exito.emit("Turno solicitado");
    this.salir();
  }

  salir() {
    this.cancelar.emit();
  }

  crearTurnosDisponibles(profesional, listaTurnosProfesional) {
    this.listaTurnosPorProfesionales = [];
    let hoy = new Date();
    let contadorDias = 0;
    do {
      let nuevaFecha = this.datePipe.transform(hoy, "yyyy-MM-dd");
      if(this.diaValido(nuevaFecha)) {
        if(this.esUnSabado(nuevaFecha)) { 
          for (const horario of this.horariosSabados) {
            if(horario >= profesional.desdeSabados && horario < profesional.hastaSabados) { // SI EL HORARIO ES POSIBLE
              let agregarTurnoDisponible = true;
              for (const turno of listaTurnosProfesional) {
                if(turno.fecha == nuevaFecha && turno.horario == horario) {
                  agregarTurnoDisponible = false;
                } 
              }
              if(agregarTurnoDisponible) {
                let turno = new Turno();
                turno.idProfesional = profesional.id;
                turno.emailPaciente = this.miUsuario.email;
                turno.especialidad = this.especialidadSeleccionada;
                turno.fecha = nuevaFecha;
                turno.horario = horario;
                this.listaTurnosPorProfesionales.push(turno);
              }
            } 
          }
        } else { //SI ES DIA SEMANAL
          for (const horario of this.horariosSemanal) {
            if(horario >= profesional.desdeSemanal && horario < profesional.hastaSemanal) { // SI EL HORARIO ES POSIBLE
              let agregarTurnoDisponible = true;
              for (const turno of listaTurnosProfesional) {
                if(turno.fecha == nuevaFecha && turno.horario == horario) {
                  agregarTurnoDisponible = false;
                } 
              }
              if(agregarTurnoDisponible) {
                let turno = new Turno();
                turno.idProfesional = profesional.id;
                turno.emailPaciente = this.miUsuario.email;
                turno.especialidad = this.especialidadSeleccionada;
                turno.fecha = nuevaFecha;
                turno.horario = horario;
                turno.nombreProfesional = profesional.nombre;
                turno.nombrePaciente = this.miUsuario.nombre;
                this.listaTurnosPorProfesionales.push(turno);
              }
            }
          }
        }
      }
      hoy.setDate(hoy.getDate() + 1);
      contadorDias++;
    }while(contadorDias < 15);
  }

  diaValido(nuevaFecha):boolean {
    let year = Number.parseInt(nuevaFecha[0] + nuevaFecha[1] + nuevaFecha[2] + nuevaFecha[3]);
    let month = Number.parseInt(nuevaFecha[5] + nuevaFecha[6]);
    month = month -1;
    let day = Number.parseInt(nuevaFecha[8] + nuevaFecha[9]);
    let nuevaFechaAux = new Date(year, month, day, 0,0,0,0);
    for (const dia of this.listaDias) {
      if(dia == this.dias[nuevaFechaAux.getDay()]) {
        return true;
      }
    }
    return false;
  }

  esUnSabado(nuevaFecha):boolean {
    let year = Number.parseInt(nuevaFecha[0] + nuevaFecha[1] + nuevaFecha[2] + nuevaFecha[3]);
    let month = Number.parseInt(nuevaFecha[5] + nuevaFecha[6]);
    month = month - 1;
    let day = Number.parseInt(nuevaFecha[8] + nuevaFecha[9]);
    let nuevaFechaAux = new Date(year, month, day, 0,0,0,0)
    if(this.dias[nuevaFechaAux.getDay()] == "Sabados") {
      return true;
    }
    return false;
  }
  
  llenarListaDeDias(profesional) {
    this.listaDias = [];
    if(profesional.diasLaborales["Lunes"]) {
      this.listaDias.push("Lunes");
    }
    if(profesional.diasLaborales["Martes"]) {
      this.listaDias.push("Martes");
    }
    if(profesional.diasLaborales["Miercoles"]) {
      this.listaDias.push("Miercoles");
    }
    if(profesional.diasLaborales["Jueves"]) {
      this.listaDias.push("Jueves");
    }
    if(profesional.diasLaborales["Viernes"]) {
      this.listaDias.push("Viernes");
    }
    if(profesional.diasLaborales["Sabados"]) {
      this.listaDias.push("Sabados");
    }
  }
}