import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { RouterService } from '../../servicios/router.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string;
  pass:string;

  constructor(private routerService : RouterService, private authService : AuthService, private usuarioSerive: UsuarioService, private toast: ToastrService) { }

  ngOnInit(): void {}

  ingresar() {
    this.authService.loguearse(this.email,this.pass).then((response:any) => {
      console.log(response);
      if(response.user.emailVerified) {
        this.usuarioSerive.obtenerTodosLosDatosDelUsuario().then((response:any) => {
          if(response.perfil == "Profesional") {
            if(response.habilitado) {
              this.routerService.navegar('/profesional');
            } else {
              this.toast.error("Solicite a un administrador que lo habilite");
            }
          }else if(response.perfil == "Administrador") {
            this.routerService.navegar('/administrador');
          } 
          else {
            this.routerService.navegar('/paciente');
          }
        }).catch((error:any) => console.log(error));
      } else {
        this.toast.error("Habilite su Cuenta con el Correo de Verificacion");
      }
    }).catch((error:any) => this.toast.error(error));
  }

  registrarse() {
    this.routerService.navegar('/registro');
  }

  cargarUsuario() {
    this.email = "lucashulej@gmail.com";
    this.pass = "123456";
  }
}
