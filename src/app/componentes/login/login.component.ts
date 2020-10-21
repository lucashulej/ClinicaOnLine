import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { RouterService } from '../../servicios/router.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string;
  pass:string;

  constructor(private routerService : RouterService, private authService : AuthService, private usuarioSerive: UsuarioService) { }

  ngOnInit(): void {}

  ingresar() {
    this.authService.loguearse(this.email,this.pass).then((response:any) => {
      console.log(response);
      if(response.user.emailVerified) {
        console.log("Verificado");
      } else {
        console.log("No verificado");
      }
    }).catch((error:any) => console.log(error))
  }

  registrarse() {
    this.routerService.navegar('/registro');
  }
}
