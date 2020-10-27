import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Turno } from 'src/app/clases/turno';
import { TurnosProfesionalComponent } from '../turnos-profesional/turnos-profesional.component';

@Component({
  selector: 'app-mis-turnos-paciente',
  templateUrl: './mis-turnos-paciente.component.html',
  styleUrls: ['./mis-turnos-paciente.component.scss']
})
export class MisTurnosPacienteComponent implements OnInit {

  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  turnos: Observable<any[]>;
  listaTurnos: any[];
  turno: Turno = new Turno();

  constructor(private db : AngularFireDatabase, private turnosService:TurnosService, private usuarioService:UsuarioService) { 
    this.turnos = this.db.list('turnos').valueChanges(); 
    this.turnos.subscribe(turnos => {
      this.listaTurnos = turnos;
      this.usuarioService.obtenerTodosLosDatosDelUsuario().then((usuario:any) => {
        this.listaTurnos = this.listaTurnos.filter(turno => {
          if(turno.emailPaciente == usuario.email && turno.estado == "Pendiente") {
            return turno;
          }
        });
      }).catch((error:any) => console.log(error));
    }, error => console.log(error));
  }

  ngOnInit(): void {}

  salir() {
    this.cancelar.emit();
  }

  rechazarTurno(id:string) {
    this.turnosService.cancelarTurno(id);
  }
}
