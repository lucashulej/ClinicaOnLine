import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/servicios/auth.service';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';


@Component({
  selector: 'app-atender-profesional',
  templateUrl: './atender-profesional.component.html',
  styleUrls: ['./atender-profesional.component.scss']
})
export class AtenderProfesionalComponent implements OnInit {

  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  usaurios: Observable<any[]>;
  listaUsuarios: any[];
  turnos: Observable<any[]>;
  listaTurnos: any[];
  turno: Turno = new Turno();
  miUsuario:Usuario;
  hoy: Date = new Date();
  
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
            if(turno.idProfesional == this.miUsuario.id && turno.estado == "Aceptado") {
              return turno;
            }
          });
        }, error => console.log(error));
      }, error => console.log(error));
    }).catch((error:any)=>console.log(error));
  }

  ngOnInit(): void {}

  atenderTurno(turno) {
    turno.estado ="Atendido";
    this.turnosService.actualizarTurno(turno);
  }

  salir() {
    this.cancelar.emit();
  }
}
