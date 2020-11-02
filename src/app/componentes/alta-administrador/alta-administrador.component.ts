import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Administrador } from 'src/app/clases/administrador';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-alta-administrador',
  templateUrl: './alta-administrador.component.html',
  styleUrls: ['./alta-administrador.component.scss']
})
export class AltaAdministradorComponent implements OnInit {
  
  @Output() error: EventEmitter<any> = new EventEmitter();
  @Output() exito: EventEmitter<any> = new EventEmitter();
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Input() miAdministrador: Administrador;

  email:string;
  pass1:string;
  pass2:string;

  constructor(private authService : AuthService, private usuarioSerive: UsuarioService,) {}

  ngOnInit(): void {}

  salir() {
    this.cancelar.emit();
  }

  registrar() {
    if(this.noExistenCamposNulos()) {
      if(this.pass1 == this.pass2) {
        this.agregarUsuarioEnBd();
      } else {
        this.error.emit("Las Contraseñas no Coinciden");
        this.pass1 = "";
        this.pass2 = "";
      }
    } else {
      this.error.emit("No puede dejar campos sin Completar");
    }
  }

  agregarUsuarioEnBd() {
    this.authService.registrarse(this.email, this.pass1).then((response: any) => {
        this.usuarioSerive.nuevoAdministrador(response.user.uid, this.email, this.pass1);
        this.authService.desloguearse();
        this.authService.loguearse(this.miAdministrador.email, this.miAdministrador.pass);
        this.exito.emit("Se dio de alta un nuevo administrador");
        this.salir();
    },(error: any) => {
      this.error.emit(error);
    });
  }

  noExistenCamposNulos(): boolean {
    if(this.pass1 != null && this.pass2 != null && this.email != null) {
      return true;
    }
    return false;
  }
}
