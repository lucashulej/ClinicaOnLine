import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { Turno } from 'src/app/clases/turno';
import { Usuario } from 'src/app/clases/usuario';
import { TurnosProfesionalComponent } from '../turnos-profesional/turnos-profesional.component';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-buscar-turnos-administrador',
  templateUrl: './buscar-turnos-administrador.component.html',
  styleUrls: ['./buscar-turnos-administrador.component.scss']
})
export class BuscarTurnosAdministradorComponent implements OnInit {

  @Input() listaTurnos:any[] = [];
  @Input() listaProfesionales:any[] = [];
  @Input() listaPacientes:any[] = [];
  @Output() cancelar: EventEmitter<any> = new EventEmitter();

  copiaDeLaLista:any[] = [];
  aux = false;
  dias = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  mostrarTurno:boolean = false;
  
  turno:Turno;
  profesional:Profesional;
  paciente:Usuario;
  fotosProfesional:any[];
  fotosPaciente:any[];

  constructor(private angularFireStorage: AngularFireStorage) { }

  ngOnInit(): void {}
  
  cambioFiltro(e) {
    if(!this.aux && this.listaTurnos.length > 0) {
      this.copiaDeLaLista = this.listaTurnos;
      this.aux = true;
    }
    this.listaTurnos = this.copiaDeLaLista.filter((turno:any) => {
      let year = Number.parseInt(turno.fecha[0] + turno.fecha[1] + turno.fecha[2] + turno.fecha[3]);
      let month = Number.parseInt(turno.fecha[5] + turno.fecha[6]);
      month = month -1;
      let day = Number.parseInt(turno.fecha[8] + turno.fecha[9]);
      let fecha = new Date(year, month, day, 0,0,0,0)
      let dia = this.dias[fecha.getDay()];
      if(dia.toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      } 
      
      if(turno.fecha.toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }
      
      if(turno.especialidad.toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }
      

      if(turno.estado.toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }

      if(turno.nombrePaciente.toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      } 
      
      if(turno.nombreProfesional.toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }
      
      if(turno.edad?.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }
      
      if(turno.temperatura?.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }

      if(turno.presion?.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }

      if(turno.claveCampo1?.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }

      if(turno.valorCampo1?.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }

      if(turno.claveCampo2?.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }

      if(turno.valorCampo2?.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }

      if(turno.claveCampo3?.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }

      if(turno.valorCampo3?.toString().toLowerCase().includes(e.target.value.toLowerCase())) {
        return turno;
      }
    });
    if(this.listaTurnos.length == 0) {
      if(e.target.value == "") {
        this.listaTurnos = this.copiaDeLaLista;
      }
    }
  }

  seleccionarTurno(turno) {
    for (const profesional of this.listaProfesionales) {
      if(profesional.id == turno.idProfesional) {
        this.profesional = profesional;
        break;
      }
    }
    for (const paciente of this.listaPacientes) {
      if(paciente.email == turno.emailPaciente) {
        this.paciente = paciente;
        break;
      } 
    }
    this.fotosProfesional = [];
    this.fotosPaciente = [];
    this.angularFireStorage.ref(this.profesional.fotoUno).getDownloadURL().subscribe((data:any) => {
      this.fotosProfesional.push(data);
    });
    this.angularFireStorage.ref(this.profesional.fotoDos).getDownloadURL().subscribe((data:any) => {
      this.fotosProfesional.push(data);
    });
    this.angularFireStorage.ref(this.paciente.fotoUno).getDownloadURL().subscribe((data:any) => {
      this.fotosPaciente.push(data);
    });
    this.angularFireStorage.ref(this.paciente.fotoDos).getDownloadURL().subscribe((data:any) => {
      this.fotosPaciente.push(data);
    });
    this.turno = turno;
    this.mostrarTurno = true;
  }

  salir() {
    this.cancelar.emit();
  }

  agarrarCancelar() {
    this.mostrarTurno = false;
  }
}
