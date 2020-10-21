import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { RouterService } from '../../servicios/router.service';
import { EspecialidadesService } from '../../servicios/especialidades.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { ToastrService } from 'ngx-toastr';

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
  fotoUno:string;
  fotoDos:string;
  nombre:string;
  apellido:string;
  habilitado: boolean = false;


  constructor(
    private routerService : RouterService, 
    private authService : AuthService,
    private especialidadesService: EspecialidadesService, 
    private toast: ToastrService,
    private usuarioSerive: UsuarioService
  ) {}

  ngOnInit(): void {}

  registrar() {
    if(this.noExistenCamposNulos()) {
      if(this.esNombreApellidoValido(this.nombre.toLowerCase()) && this.esNombreApellidoValido(this.apellido.toLowerCase())) {
        if(this.pass1 == this.pass2) {
          if(this.vistaRegistro == "Profesional") {
            if(this.listaEspecialidades.length > 0) {
              //
              this.authService.registrarse(this.email, this.pass1).then((response: any) => {
                this.especialidadesService.actualizarEspecialidades(this.listaEspecialidades);
                this.usuarioSerive.nuevoProfesional(response.user.uid, this.nombre, this.apellido, this.email, this.pass1, "A", "B", this.listaEspecialidades);
                this.authService.desloguearse();
                this.limpiarForm();
                this.cancelar();
              },(error: any) => {
                this.toast.error(error);
              });
              //
            } else {
              this.toast.error("Debe tener almenos una especialidad");
            }
          } else { 
             //
             this.authService.registrarse(this.email, this.pass1).then((response: any) => {
              this.usuarioSerive.nuevoPaciente(response.user.uid, this.nombre, this.apellido, this.email, this.pass1, "A", "B");
              this.authService.desloguearse();
              this.limpiarForm();
              this.cancelar();
            },(error: any) => {
              this.toast.error(error);
            });
            //
          }
        } else {
          this.toast.error("Las Contraseñas no Coinciden");
        }
      } else {
        this.toast.error("Nombre o Contraseña invalidos");
      }
    } else {
      this.toast.error("No puede dejar campos sin completar");
    }
  }

  noExistenCamposNulos(): boolean {
    if(this.nombre != null && this.apellido != null && this.pass1 != null && this.pass2 != null && this.email != null) {
      return true;
    }
    return false;
  }

  cancelar() {
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

  limpiarForm() {
    this.vistaRegistro = "";
    this.nuevaEspecialidad = "";
    this.listaEspecialidades = [];
    this.email = "";
    this.pass1 = "";
    this.pass2 = "";
    this.fotoUno = "";
    this.fotoDos = "";
    this.nombre = "";
    this.apellido = "";
  }

  subirFotos() { //TERMINAR USANDO STORAGE

  }

 
}
