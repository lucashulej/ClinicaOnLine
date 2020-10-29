import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { RouterService } from '../../servicios/router.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { Usuario } from 'src/app/clases/usuario';
import { error } from 'protractor';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  fotoUno:string = "../../../assets/images/default.jpg";
  fotoDos:string = "../../../assets/images/default.jpg";

  usuarios: Observable<any[]>;
  listaUsuarios: any[];
  usuario:Usuario;

  constructor(private routerService : RouterService, private authService : AuthService, private angularFireStorage: AngularFireStorage, private db : AngularFireDatabase) { 
    this.authService.obtenerUsuario().then((usuarioFire:any) => {
      this.usuarios = this.db.list('usuarios').valueChanges(); 
      this.usuarios.subscribe(usuarios => {
        this.listaUsuarios = usuarios;
        for (const usuario of this.listaUsuarios) {
          if(usuario.id == usuarioFire.uid) {
            this.usuario = usuario;
            this.angularFireStorage.ref(usuario.fotoUno).getDownloadURL().subscribe((data:any) => {
              console.log(data);
              this.fotoUno = data;
            });
            this.angularFireStorage.ref(usuario.fotoDos).getDownloadURL().subscribe((data:any) => {
              console.log(data);
              this.fotoDos = data;
            });
            break;
          }
        }
      }, error => console.log(error));
    }).catch((error:any) => console.log(error));
  }

  ngOnInit(): void {}

  volver() {
    if(this.usuario.perfil == "Profesional") {
      this.routerService.navegar('/profesional');
    } else {
      this.routerService.navegar('/paciente');
    }
  }
}
