import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { UsuarioService } from '../../servicios/usuario.service';
import { AuthService } from '../../servicios/auth.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-horarios-profesional',
  templateUrl: './horarios-profesional.component.html',
  styleUrls: ['./horarios-profesional.component.scss']
})
export class HorariosProfesionalComponent implements OnInit {

  @Output() error: EventEmitter<any> = new EventEmitter();
  @Output() exito: EventEmitter<any> = new EventEmitter();
  @Output() cancelar: EventEmitter<any> = new EventEmitter();

  profesional: Profesional = new Profesional();
  diasLaborales = {"Lunes" : false , "Martes" : false , "Miercoles" : false , "Jueves" : false , "Viernes" : false , "Sabados" : false};
  desdeSemanal = "08:00";
  hastaSemanal = "19:00";
  desdeSabados = "08:00";
  hastaSabados = "14:00";
  duracion = 30;

  usuarios: Observable<any[]>;
  listaUsuarios: any[];


  constructor(private usuarioService: UsuarioService, private authService : AuthService, private db : AngularFireDatabase) {
    this.authService.obtenerUsuario().then((usuarioFire:any) => {
      this.usuarios = this.db.list('usuarios').valueChanges(); 
      this.usuarios.subscribe(usuarios => {
        this.listaUsuarios = usuarios;
        for (const usuario of this.listaUsuarios) {
          if(usuario.id == usuarioFire.uid) {
            this.profesional = usuario;
            this.diasLaborales =  this.profesional.diasLaborales;
            this.desdeSemanal =  this.profesional.desdeSemanal;
            this.hastaSemanal =  this.profesional.hastaSemanal;
            this.desdeSabados =  this.profesional.desdeSabados;
            this.hastaSabados =  this.profesional.hastaSabados;
            this.duracion =  this.profesional.duracion;
          }
        }
      }, error => console.log(error));
    }).catch((error:any) => console.log(error))
  }

  ngOnInit(): void {}

  salir() {
    this.cancelar.emit();
  }

  guardar() {
    if(this.seleccionoDiaSemana()) {
      if(this.verificarDuracion()) {
        if(this.desdeSemanal.length == 0 || this.hastaSemanal.length == 0) {
          this.error.emit("Seleccione un horario para los dias seleccionados");
         } else {
          if(this.verificarHorariosCorrectos("Semanal")) {
            if(this.diasLaborales["Sabados"]) {
              if(this.desdeSabados.length == 0 || this.hastaSabados.length == 0) { 
                this.error.emit("Seleccione un horario para los sabados");
              } else {
                if(this.verificarHorariosCorrectos("Sabados")) { 
                  this.asignarValores(); 
                  this.usuarioService.actualizarProfesional(this.profesional);
                  this.exito.emit("Se actualizo los horarios de manera correcta");
                  this.salir();
                }
              }
            } else {
              this.asignarValores(); 
              this.usuarioService.actualizarProfesional(this.profesional);
              this.exito.emit("Se actualizo los horarios de manera correcta");
              this.salir();
            }
          }
        }
      } else {
        
      }
    } else {
      this.error.emit("Debe seleccionar almenos un dia de la semana (Lunes - Viernes) para trabajar");
    }
  }

  asignarValores() {
    this.profesional.diasLaborales = this.diasLaborales;
    this.profesional.desdeSemanal = this.desdeSemanal;
    this.profesional.hastaSemanal = this.hastaSemanal;
    this.profesional.desdeSabados = this.desdeSabados;
    this.profesional.hastaSabados = this.hastaSabados;
    this.profesional.duracion = this.duracion;
  }

  seleccionoDiaSemana():boolean {
    for (const dia in this.diasLaborales) {
      if(this.diasLaborales[dia]) {
        if(dia == "Sabados") {
          continue;
        }
        return true;
      }
    }
    return false;
  }

  verificarDuracion():boolean {
    let retorno = false;
    if(this.duracion >= 30) {
      if(this.duracion <= 60) {
        retorno = true;
      } else {
        this.error.emit("Los turnos duran como maximo 60 minutos");
      }
    } else {
      this.error.emit("Los turnos duran almenos 30 minutos");
    }
    return retorno;
  }

  verificarHorariosCorrectos(caso:string):boolean {
    let retorno = false;
    if(caso == "Semanal") {
      let auxHoraDesde = this.desdeSemanal[0] + this.desdeSemanal[1];
      let auxMinutosDesde = this.desdeSemanal[3] + this.desdeSemanal[4];
      let auxHoraHasta = this.hastaSemanal[0] + this.hastaSemanal[1];
      let auxMinutosHasta = this.hastaSemanal[3] + this.hastaSemanal[4];
      let fechaDesde:Date = new Date(1970 , 0O1, 0O1, Number.parseInt(auxHoraDesde), Number.parseInt(auxMinutosDesde), 0, 0);
      let fechaHasta:Date = new Date(1970 , 0O1, 0O1, Number.parseInt(auxHoraHasta), Number.parseInt(auxMinutosHasta), 0, 0);
      if(fechaDesde.getHours() >= 8) {
        if(fechaHasta.getHours() < 19 || (fechaHasta.getHours() == 19 && fechaHasta.getMinutes() == 0)) {
          if(((fechaHasta.getTime()/60000) - (fechaDesde.getTime()/60000)) >= this.duracion) {
            retorno = true;
          } else {
            this.error.emit("Franja horaria muy corta");
          }
        } else {
          this.error.emit("La clinica cierra a las 19:00");
        }
      } else {
        this.error.emit("La clinica abre a las 8:00");
      }
    } else {
      let auxHoraDesde = this.desdeSabados[0] + this.desdeSabados[1];
      let auxMinutosDesde = this.desdeSabados[3] + this.desdeSabados[4];
      let auxHoraHasta = this.hastaSabados[0] + this.hastaSabados[1];
      let auxMinutosHasta = this.hastaSabados[3] + this.hastaSabados[4];
      let fechaDesde:Date = new Date(1970 , 0O1, 0O1, Number.parseInt(auxHoraDesde), Number.parseInt(auxMinutosDesde), 0, 0);
      let fechaHasta:Date = new Date(1970 , 0O1, 0O1, Number.parseInt(auxHoraHasta), Number.parseInt(auxMinutosHasta), 0, 0);
      if(fechaDesde.getHours() >= 8) {
        if(fechaHasta.getHours() < 14 || (fechaHasta.getHours() == 14 && fechaHasta.getMinutes() == 0)) {
          if(((fechaHasta.getTime()/60000) - (fechaDesde.getTime()/60000)) >= this.duracion) {
            retorno = true;
          } else {
            this.error.emit("Franja horaria sabados muy corta");
          }
        } else {
          this.error.emit("La clinica cierra a las 14:00 los sabados");
        }
      } else {
        this.error.emit("La clinica abre a las 8:00");
      }
    }
    return retorno;
  }
}
