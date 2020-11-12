import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Turno } from '../clases/turno';
import { UsuarioService } from './usuario.service';

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

  nuevoTurno(turno:Turno) {
    turno.id  = '_' + Math.random().toString(36).substr(2, 9); 
    turno.estado = "Pendiente";
    this.db.list('turnos').set(turno.id, turno); 
  }

  actualizarTurno(turno:Turno) {
    this.db.list('turnos').set(turno.id, turno); 
  }
}
