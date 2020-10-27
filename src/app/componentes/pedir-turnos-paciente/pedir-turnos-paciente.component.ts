import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TurnosService } from 'src/app/servicios/turnos.service';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Turno } from 'src/app/clases/turno';

@Component({
  selector: 'app-pedir-turnos-paciente',
  templateUrl: './pedir-turnos-paciente.component.html',
  styleUrls: ['./pedir-turnos-paciente.component.scss']
})
export class PedirTurnosPacienteComponent implements OnInit {

  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  turnos: Observable<any[]>;
  listaTurnos: any[];
  listaTurnosPendientes: any[];
  listaTurnosAceptados: any[];
  turno: Turno = new Turno();
  
  profesionales: Observable<any[]>;
  listaProfesionales: any[];
  
  constructor(private db : AngularFireDatabase, private turnosService:TurnosService, private usuarioService:UsuarioService) { 

    this.profesionales = this.db.list('usuarios').valueChanges(); 
    this.profesionales.subscribe(profesionales => {
      this.listaProfesionales = profesionales;
      this.listaProfesionales = this.listaProfesionales.filter(profesional => profesional.habilitado == true);
    }, error => console.log(error));

    this.turnos = this.db.list('turnos').valueChanges(); 
    this.turnos.subscribe(turnos => {
      this.listaTurnos = turnos;
      this.usuarioService.obtenerTodosLosDatosDelUsuario().then((usuario:any) => {
        this.listaTurnos = this.listaTurnos.filter(turno => turno.idProfesinal == usuario.id);
        this.listaTurnosPendientes = this.listaTurnos.filter(turno => turno.estado == "Pendiente");
        this.listaTurnosAceptados = this.listaTurnos.filter(turno => turno.estado == "Aceptado");
        console.log(this.listaTurnos);
        console.log(this.listaTurnosPendientes);
        console.log(this.listaTurnosAceptados);
      }).catch((error:any) => console.log(error));
    }, error => console.log(error));
  }

  ngOnInit(): void {
  }

  salir() {
    this.cancelar.emit();
  }
}
