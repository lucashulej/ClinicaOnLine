import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Turno } from '../clases/turno';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  turnos: Observable<any[]>;
  listaTurnos: any[];

  constructor(private db : AngularFireDatabase, private usuarioService : UsuarioService) {
    this.turnos = this.db.list('turnos').valueChanges(); 
    this.turnos.subscribe(turnos => this.listaTurnos = turnos, error => console.log(error));
  }

  /*
  obtenerTurnosDeProfesional() {
    this.usuarioService.obtenerTodosLosDatosDelUsuario().then((usuario:any) => {
      let auxTurnos: Observable<any[]>;
      let auxListaTurnos: any[];
      let turnosDelProfesional: any[];
      auxTurnos = this.db.list('turnos').valueChanges(); 
      auxTurnos.subscribe(auxTurnos => {
        auxListaTurnos = auxTurnos;
        for (const turno of auxTurnos) {
          if(turno.idProfesinal == usuario.id) {
            turnosDelProfesional.push(turno);
          }
        }
        return turnosDelProfesional;
      }, error => console.log(error));
    }).catch((error:any) => console.log(error));
  }
  */

  aceptarTurno(id:string) {
    for (const turno of this.listaTurnos) {
      if(turno.id == id) {
        turno.estado = "Aceptado";
        this.db.list('turnos').set(turno.id, turno); 
        break;
      }
    }
  }

  cancelarTurno(id:string) {
    for (const turno of this.listaTurnos) {
      if(turno.id == id) {
        turno.estado = "Cancelado";
        this.db.list('turnos').set(turno.id, turno); 
        break;
      }
    }
  }

  nuevoTurno(turno:Turno) {
    turno.id  = '_' + Math.random().toString(36).substr(2, 9); 
    turno.estado = "Pendiente";
    this.db.list('turnos').set(turno.id, turno); 
  }

  actualizarTurno(turno:Turno) {
    this.db.list('turnos').set(turno.id, turno); 
  }
}
