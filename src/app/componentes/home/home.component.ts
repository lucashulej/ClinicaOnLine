import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { RouterService } from '../../servicios/router.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  downloadURL:string;
  url:string;
  constructor(
    private angularFireStorage: AngularFireStorage,
    private routerService : RouterService, 
    private authService : AuthService,
    private usuariosService : UsuarioService) { 
    
    /*
    this.angularFireStorage.ref('/usuarios/').getDownloadURL().subscribe((data:any) => {
      this.downloadURL = data;
      console.log(this.downloadURL);
    });
    */
    //this.angularFireStorage.ref('/usuarios/').listAll().subscribe((imagenes) => console.log(imagenes));
    
  }

  ngOnInit(): void {
  }

  cargarFotos() {
    this.url = this.downloadURL;
  }

  volver() {
   this.authService.desloguearse();
    this.routerService.navegar("/login");
  }
}
