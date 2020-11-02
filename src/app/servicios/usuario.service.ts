import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Usuario } from '../clases/usuario';
import { Profesional } from '../clases/profesional';
import { AuthService } from './auth.service';
import { Administrador } from '../clases/administrador';
import { EmitAndSemanticDiagnosticsBuilderProgram } from 'typescript';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuarios: Observable<any[]>;
  listaUsuarios: any[];

  constructor(private db : AngularFireDatabase, private authService : AuthService) { 
    this.usuarios = this.db.list('usuarios').valueChanges(); 
    this.usuarios.subscribe(usuarios => this.listaUsuarios = usuarios, error => console.log(error));
  }

  nuevoProfesional(id:string, nombre:string, apellido:string, email:string, pass:string, fotoUno:string, fotoDos:string, especialidades) {
    let profesional = new Profesional();
    profesional.perfil = "Profesional";
    profesional.habilitado = false;
    profesional.id = id;
    profesional.nombre = nombre;
    profesional.apellido = apellido;
    profesional.email = email;
    profesional.pass = pass;
    profesional.fotoUno = fotoUno;
    profesional.fotoDos = fotoDos;
    profesional.especialidades = especialidades;
    profesional.diasLaborales = {"Lunes" : true , "Martes" : true , "Miercoles" : true , "Jueves" : true , "Viernes" : true , "Sabados" : true};
    profesional.desdeSemanal = "08:00";
    profesional.hastaSemanal = "19:00";
    profesional.desdeSabados = "08:00";
    profesional.hastaSabados = "14:00";
    profesional.duracion = 30;
    this.db.list('usuarios').set(id, profesional);
  }

  nuevoPaciente(id:string, nombre:string, apellido:string, email:string, pass:string, fotoUno:string, fotoDos:string) {
    let usuario = new Usuario();
    usuario.perfil = "Paciente";
    usuario.id = id;
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.pass = pass;
    usuario.fotoUno = fotoUno;
    usuario.fotoDos = fotoDos;
    this.db.list('usuarios').set(id, usuario);
  }

  nuevoAdministrador(id:string, email:string, pass:string) {
    let administrador = new Administrador();
    administrador.perfil = "Administrador";
    administrador.habilitado = false;
    administrador.id = id;
    administrador.email = email;
    administrador.pass = pass;
    this.db.list('usuarios').set(id, administrador);
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
