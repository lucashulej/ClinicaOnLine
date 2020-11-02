import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { RouterService } from '../../servicios/router.service';
import { EspecialidadesService } from '../../servicios/especialidades.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  vistaRegistro: string = "";
  nuevaEspecialidad: string = "";
  listaEspecialidades: string[] = [];
  email:string;
  pass1:string;
  pass2:string;
  perfil:string
  fotoUnoFile:string;
  fotoDosFile:string;
  fotoUno:string;
  fotoDos:string;
  nombre:string;
  apellido:string;
  habilitado: boolean = false;
  captcha:string;

  constructor(
    private routerService : RouterService, 
    private authService : AuthService,
    private especialidadesService: EspecialidadesService, 
    private toast: ToastrService,
    private usuarioSerive: UsuarioService,
    private angularFireStorage: AngularFireStorage
  ) {}

  ngOnInit(): void {}

  registrar() {
    if(this.noExistenCamposNulos()) {
      if(this.esNombreApellidoValido(this.nombre.toLowerCase()) && this.esNombreApellidoValido(this.apellido.toLowerCase())) {
        if(this.pass1 == this.pass2) {
          if(this.captcha.toLowerCase() == "qgphjd") {
            if(this.vistaRegistro == "Profesional") {
              if(this.listaEspecialidades.length > 0) {
                this.agregarUsuarioEnBd("Profesional");
              } else {
                this.toast.error("Debe tener almenos una especialidad");
              }
            } else { 
              this.agregarUsuarioEnBd("Paciente");
            }
          } else {
            this.toast.error("Captcha Erroneo");
            this.captcha = "";
          }
        } else {
          this.toast.error("Las Contraseñas no Coinciden");
          this.pass1 = "";
          this.pass2 = "";
        }
      } else {
        this.toast.error("Nombre o Apellido invalidos");
      }
    } else {
      this.toast.error("No puede dejar campos sin Completar");
    }
  }

  agregarUsuarioEnBd(perfil:string) {
    this.authService.registrarse(this.email, this.pass1).then((response: any) => {
      this.subirFotos(response.user.uid);
      if(perfil == "Profesional") {
        this.especialidadesService.actualizarEspecialidades(this.listaEspecialidades);
        this.usuarioSerive.nuevoProfesional(response.user.uid, this.nombre, this.apellido, this.email, this.pass1, this.fotoUno, this.fotoDos, this.listaEspecialidades);
      } else {
        this.usuarioSerive.nuevoPaciente(response.user.uid, this.nombre, this.apellido, this.email, this.pass1, this.fotoUno, this.fotoDos);
      }
      this.authService.desloguearse();
      this.salir();
    },(error: any) => {
      this.toast.error(error);
    });
  }

  noExistenCamposNulos(): boolean {
    if(this.nombre != null && this.apellido != null && this.pass1 != null && this.pass2 != null && this.email != null && this.captcha != null) {
      return true;
    }
    return false;
  }

  salir() {
    this.routerService.navegar('/login');
  }

  esNombreApellidoValido(nombreApellido:string): boolean {
    let retorno:boolean = true;
    if(nombreApellido) {
      for (const char of nombreApellido) {
        if(char < 'a' || char > 'z') {
          retorno = false;
          break;
        }
      }
    } else {
      retorno = false;
    }
    return retorno;
  }

  agregarEspecialidad() {
    if(this.nuevaEspecialidad) {
      this.nuevaEspecialidad = this.nuevaEspecialidad.trim();
      this.nuevaEspecialidad = this.nuevaEspecialidad.toLowerCase();
      if(!this.listaEspecialidades.includes(this.nuevaEspecialidad)) {
        this.listaEspecialidades.push(this.nuevaEspecialidad);
        this.nuevaEspecialidad = "";
      } 
    }
  }

  handleChangeFiles(e, numero) {
    if(numero == 1) {
      this.fotoUnoFile = e.target.files[0];
    } else {
      this.fotoDosFile = e.target.files[0];
    }
  }

  subirFotos(id:string) { 
    if(this.fotoUnoFile) {
      this.fotoUno = `/usuarios/${id}/1`;
      this.angularFireStorage.upload(this.fotoUno,this.fotoUnoFile);
    } else {
      this.fotoUno = `/usuarios/default.jpg`;
    } 
    if(this.fotoDosFile) {
      this.fotoDos = `/usuarios/${id}/2`;
      this.angularFireStorage.upload(this.fotoDos,this.fotoDosFile);
    } else {
      this.fotoDos = `/usuarios/default.jpg`;
    }
  }
}
