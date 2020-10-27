import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { Profesional } from '../clases/profesional';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  profesional: Profesional;
  
  usuarios: Observable<any[]>;
  listaUsuarios: any[];

  constructor(private db : AngularFireDatabase, private authService : AuthService) { 
    this.usuarios = this.db.list('usuarios').valueChanges(); 
    this.usuarios.subscribe(usuarios => this.listaUsuarios = usuarios, error => console.log(error));
  }

  nuevoProfesional(id:string, nombre:string, apellido:string, email:string, pass:string, fotoUno:string, fotoDos:string, especialidades) {
    this.profesional = new Profesional();
    this.profesional.habilitado = false;
    this.profesional.perfil = "Profesional";
    this.profesional.id = id;
    this.profesional.nombre = nombre;
    this.profesional.apellido = apellido;
    this.profesional.email = email;
    this.profesional.pass = pass;
    this.profesional.fotoUno = fotoUno;
    this.profesional.fotoDos = fotoDos;
    this.profesional.especialidades = especialidades;
    this.profesional.diasLaborales = {"Lunes" : true , "Martes" : true , "Miercoles" : true , "Jueves" : true , "Viernes" : true , "Sabados" : true};
    this.profesional.desdeSemanal = "08:00";
    this.profesional.hastaSemanal = "19:00";
    this.profesional.desdeSabados = "08:00";
    this.profesional.hastaSabados = "14:00";
    this.profesional.duracion = 30;
    this.db.list('usuarios').set(id, this.profesional);
  }

  nuevoPaciente(id:string, nombre:string, apellido:string, email:string, pass:string, fotoUno:string, fotoDos:string) {
    this.usuario = new Usuario();
    this.usuario.perfil = "Paciente";
    this.usuario.id = id;
    this.usuario.nombre = nombre;
    this.usuario.apellido = apellido;
    this.usuario.email = email;
    this.usuario.pass = pass;
    this.usuario.fotoUno = fotoUno;
    this.usuario.fotoDos = fotoDos;
    this.db.list('usuarios').set(id, this.usuario);
  }

  async obtenerTodosLosDatosDelUsuario() {
    let miUsuario:any = await this.authService.obtenerUsuario();
    for (const usuario of this.listaUsuarios) {
      if(usuario.id == miUsuario.uid) {
        return usuario;
      }
    }
  }

  actualizarProfesional(profesional:Profesional) {
    this.db.list('usuarios').set(profesional.id, profesional); 
  }
}
