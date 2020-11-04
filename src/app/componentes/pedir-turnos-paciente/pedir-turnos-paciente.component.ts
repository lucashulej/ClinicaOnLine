import { Component, OnInit, EventEmitter, Output, ɵConsole } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno } from 'src/app/clases/turno';
import { Profesional } from 'src/app/clases/profesional';
import { Usuario } from 'src/app/clases/usuario';

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

  turnos: Observable<any[]>;
  listaTurnos: any[];
  turno: Turno = new Turno();
  
  profesionales: Observable<any[]>;
  listaProfesionales: any[];
  listaProfesionalesApellido: any[];
  listaProfesionalesEspecialidad: any[];
  listaProfesionalesSemana: any[];

  vistaTabla:string = "Apellido";
  filtroSemana = "";
  filtroEspecialidad = "";

  profesionalSeleccionado:Profesional;
  listaDias: string[];
  fechaSeleccionada: Date;
  miUsuario:Usuario;
  dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabados", "Domingos"];
  horarioSeleccionado = "";
  especialidadSeleccionada = "";

  fechaMin = "2020-05-01";
  fechaMax = "2020-11-15";

  constructor(private db : AngularFireDatabase, private turnosService:TurnosService, private authService:AuthService) { 
    
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
        this.cargarListaProfesionales();
      }, error => console.log(error));
    }).catch((error:any)=>console.log(error));
    
    this.turnos = this.db.list('turnos').valueChanges(); 
    this.turnos.subscribe(turnos => {
      this.listaTurnos = turnos;
      this.listaTurnos = this.listaTurnos.filter(turno => {
        if(turno.estado == "Pendiente" || turno.estado == "Aceptado") {
          return turno;
        }
      });
    }, error => console.log(error));
  }

  ngOnInit(): void {}

  cambiarVista(vista:string) {
    this.vistaTabla = vista;
    if(vista == "Especialidad") {
      this.listaProfesionalesEspecialidad = [];
      this.listaProfesionalesEspecialidad = this.listaProfesionales.filter(profesional => profesional.especialidades.includes(this.filtroEspecialidad));
    } else if (vista == "Semana") {
      this.listaProfesionalesSemana = [];
      this.listaProfesionalesSemana = this.listaProfesionales.filter(profesional => {
        if(profesional.diasLaborales[this.filtroSemana]) {
          return profesional;
        }
      });
    }
  }

  cargarListaProfesionales() {
    console.log(this.listaProfesionales);
    this.listaProfesionalesApellido = this.listaProfesionales;
    this.listaProfesionalesApellido.sort(this.ordenarApellido);
  }

  ordenarApellido(a:any , b:any) {
    if (a.apellido < b.apellido) {
      return -1;
    }
    if (a.apellido > b.apellido) {
      return 1;
    }
    return 0;
  }

  seleccionarProfesional(id:string) {
    for (const profesional of this.listaProfesionales) {
      if(profesional.id == id) {
        this.profesionalSeleccionado = profesional;
        this.llenarListaDeDias();
        break;
      }
    }
  }

  llenarListaDeDias() {
    this.listaDias = [];
    if(this.profesionalSeleccionado.diasLaborales["Lunes"]) {
      this.listaDias.push("Lunes");
    }
    if(this.profesionalSeleccionado.diasLaborales["Martes"]) {
      this.listaDias.push("Martes");
    }
    if(this.profesionalSeleccionado.diasLaborales["Miercoles"]) {
      this.listaDias.push("Miercoles");
    }
    if(this.profesionalSeleccionado.diasLaborales["Jueves"]) {
      this.listaDias.push("Jueves");
    }
    if(this.profesionalSeleccionado.diasLaborales["Viernes"]) {
      this.listaDias.push("Viernes");
    }
    if(this.profesionalSeleccionado.diasLaborales["Sabados"]) {
      this.listaDias.push("Sabados");
    }
    console.log(this.listaDias);
  }

  salir() {
    this.cancelar.emit();
  }

  ////////////////////////////////////////////////////

  diaValido():boolean {
    let fechaAux = new Date(this.fechaSeleccionada);
    for (const dia of this.listaDias) {
      if(dia == this.dias[fechaAux.getDay()]) {
        return true;
      }
    }
    return false;;
  }

  horarioValido(dia:string):boolean {
    let retorno = false;
    if(this.horarioSeleccionado.length != 0 ) {
      if(dia == "Sabados") {
        if(this.horarioSeleccionado >= this.profesionalSeleccionado.desdeSabados && this.horarioSeleccionado < this.profesionalSeleccionado.hastaSabados) {
          if(this.diferenciaEnMinutos(this.horarioSeleccionado ,this.profesionalSeleccionado.hastaSabados) >= this.profesionalSeleccionado.duracion) {
            retorno = true;
          } 
        } 
      } else {
        if(this.horarioSeleccionado >= this.profesionalSeleccionado.desdeSemanal && this.horarioSeleccionado < this.profesionalSeleccionado.hastaSemanal) {
          if(this.diferenciaEnMinutos(this.horarioSeleccionado ,this.profesionalSeleccionado.hastaSemanal) >= this.profesionalSeleccionado.duracion) {
            retorno = true;
          } 
        }
      }
    }
    return retorno;
  }

  elHorarioEstaLibre():boolean {
    let retorno = false;
    let error = false;
    let turnosDelDia:any[] = [];
    for (const turno of this.listaTurnos) {
      if(turno.fecha == this.fechaSeleccionada && turno.idProfesinal == this.profesionalSeleccionado.id) {
        turnosDelDia.push(turno);
      } 
    }
    if(turnosDelDia.length == 0) {
      retorno = true;
    } else {
      for (const turno of turnosDelDia) {
        if(this.horarioSeleccionado > turno.horario) {
          if(this.diferenciaEnMinutos(turno.horario, this.horarioSeleccionado) < this.profesionalSeleccionado.duracion) {
            error = true;
            break;
          }
        } else if (this.horarioSeleccionado < turno.horario) { 
          if(this.diferenciaEnMinutos(this.horarioSeleccionado, turno.horario) < this.profesionalSeleccionado.duracion) {
            error = true;
            break;
          }
        } else {
          error = true;
          break;
        }
      }
      if(!error) {
        retorno = true;
      }
    }
    return retorno;
  }

  diferenciaEnMinutos(horarioA, horarioB):number { 
    let horaA = horarioA[0] + horarioA[1];
    let minutosA = horarioA[3] + horarioA[4];
    let horaB = horarioB[0] + horarioB[1];
    let minutosB = horarioB[3] + horarioB[4];
    let fechaDesde:Date = new Date(1970 , 0O1, 0O1, Number.parseInt(horaA), Number.parseInt(minutosA), 0, 0);
    let fechaHasta:Date = new Date(1970 , 0O1, 0O1, Number.parseInt(horaB), Number.parseInt(minutosB), 0, 0);
    return ((fechaHasta.getTime()/60000) - (fechaDesde.getTime()/60000));
  }

  pedirTurno() {
    let fechaAux = new Date(this.fechaSeleccionada);
    if(this.especialidadSeleccionada != "") {
      if(this.diaValido()) {
        if(this.horarioValido(this.dias[fechaAux.getDay()])) {
          if(this.elHorarioEstaLibre()) {
            this.crearTurno();
          } else {
            this.error.emit("Ese turno se interpone con otro");
          }
        } else {
          this.error.emit("Seleccione un horario valido");
        }
      } else {
        this.error.emit("En la fecha seleccionada el profesional no trabaja");
      }
    } else {
      this.error.emit("Seleccione la especialidad del medico");
    }
  }

  crearTurno() {
    let turno = new Turno();
    turno.idProfesional = this.profesionalSeleccionado.id;
    turno.emailPaciente = this.miUsuario.email;
    turno.especialidad = this.especialidadSeleccionada;
    turno.fecha = this.fechaSeleccionada;
    turno.horario = this.horarioSeleccionado;
    this.turnosService.nuevoTurno(turno);
    this.exito.emit("Turno solicitado");
    this.profesionalSeleccionado = null;
  }
}