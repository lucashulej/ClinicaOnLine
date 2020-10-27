import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { RouterService } from '../../servicios/router.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  
  @Input() ruta : string = null;
  @Input() presentacion : boolean = false;
  @Input() salir : boolean = false;
  fotoUno:string = "../../../assets/images/default.jpg";
  fotoDos:string = "../../../assets/images/default.jpg";

  usuarios: Observable<any[]>;
  listaUsuarios: any[];
  constructor(
    private routerService : RouterService, 
    private authService : AuthService,
    private angularFireStorage: AngularFireStorage,
    private db : AngularFireDatabase) { 
    this.cargarFotos();
  }

  ngOnInit(): void {}

  cargarFotos() {
    this.usuarios = this.db.list('usuarios').valueChanges(); 
    this.usuarios.subscribe(usuarios => {
      this.listaUsuarios = usuarios;
      this.authService.obtenerUsuario().then((usuarioFire:any) => {
        for (const usuario of this.listaUsuarios) {
          if(usuario.id == usuarioFire.uid) {
            this.angularFireStorage.ref(usuario.fotoUno).getDownloadURL().subscribe((data:any) => {
              this.fotoUno = data;
            });
            this.angularFireStorage.ref(usuario.fotoDos).getDownloadURL().subscribe((data:any) => {
              this.fotoDos = data;
            });
            break;
          }
        }
      });
    }, error => console.log(error));
  }

  desloguerarseSalir() {
    this.authService.desloguearse();
    this.routerService.navegar('');
  }

  quienSoy() {
    //this.routerService.navegar(['/QuienSoy']);
  }
}
