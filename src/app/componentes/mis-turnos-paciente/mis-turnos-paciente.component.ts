import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-mis-turnos-paciente',
  templateUrl: './mis-turnos-paciente.component.html',
  styleUrls: ['./mis-turnos-paciente.component.scss']
})
export class MisTurnosPacienteComponent implements OnInit {

  @Output() exito: EventEmitter<any> = new EventEmitter();
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Output() error: EventEmitter<any> = new EventEmitter();

  usaurios: Observable<any[]>;
  listaUsuarios: any[];
  turnos: Observable<any[]>;
  listaTurnos: any[];
  turno: Turno = new Turno();
  miUsuario:Usuario;
  vistaMisTurnos = "Turnos";

  constructor(private db : AngularFireDatabase, private turnosService:TurnosService, private authService:AuthService) { 
    this.authService.obtenerUsuario().then((usuarioFire:any)=>{
      this.usaurios = this.db.list('usuarios').valueChanges(); 
      this.usaurios.subscribe(usaurios => {      
        this.listaUsuarios = usaurios;
        for (const usuario of this.listaUsuarios) {
          if(usuario.id == usuarioFire.uid) {
            this.miUsuario = usuario;
            break;
          }
        }
        this.turnos = this.db.list('turnos').valueChanges(); 
        this.turnos.subscribe(turnos => {
          this.listaTurnos = turnos;
          this.listaTurnos = this.listaTurnos.filter(turno => {
            if(turno.emailPaciente == this.miUsuario.email && (turno.estado == "Pendiente" || turno.estado == "Atendido" || turno.estado == "Cancelado")) {
              return turno;
            }
          });
        }, error => console.log(error));
      }, error => console.log(error));
    }).catch((error:any)=>console.log(error));
  }

  ngOnInit(): void {}

  salir() {
    this.cancelar.emit();
  }

  rechazarTurno(turno:Turno) {
    turno.estado = "Cancelado";
    this.turnosService.actualizarTurno(turno);
  }

  encuestaTurno(turno:Turno) {
    this.turno = turno;
    this.vistaMisTurnos = "Encuesta";
  }

  cambiarVista() {
    this.vistaMisTurnos = "Turnos";
  }

  subirTurnoConResenia(turno:Turno) {
    this.turnosService.actualizarTurno(turno);
    this.cambiarVista();
    this.exito.emit("Turno Atendido");
  }

  agarrarError(error:string) {
    this.error.emit(error);
  }
}
