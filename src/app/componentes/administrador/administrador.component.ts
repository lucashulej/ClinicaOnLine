import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from '../../servicios/auth.service';
import { Administrador } from 'src/app/clases/administrador';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  vistaAdministrador:string = "";
  usuarios: Observable<any[]>;
  listaUsuarios: any[];
  listaProfesionalesNoHabilitados: any[];
  miAdministrador:Administrador;

  constructor(private db : AngularFireDatabase, private authService : AuthService, private toast: ToastrService) { 
    this.usuarios = this.db.list('usuarios').valueChanges(); 
    this.usuarios.subscribe(usuarios => {
      this.listaUsuarios = usuarios;
      this.authService.obtenerUsuario().then((usuarioFire:any) => {
        for (const usuario of this.listaUsuarios) {
          if(usuario.id == usuarioFire.uid) {
            this.miAdministrador = usuario;
            break;
          }
        }
        this.listaProfesionalesNoHabilitados = this.listaUsuarios.filter(usuario => {
          if(usuario.perfil == "Profesional" && usuario.habilitado == false) {
              return usuarioFire;
          }
        });
      }).catch((error:any)=>console.log(error));
    }, error => console.log(error));
  }

  ngOnInit(): void {}

  cambiarVistaAdministrador(vista:string) {
    this.vistaAdministrador = vista;
  }

  agarrarError(error:string) {
    this.toast.error(error);
  }

  agarrarExito(exito:string) {
    this.toast.success(exito);
  }

  agarrarCancelar() {
    this.vistaAdministrador = "";
  }
}