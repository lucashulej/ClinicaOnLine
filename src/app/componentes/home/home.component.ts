import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/servicios/auth.service';
import { RouterService } from '../../servicios/router.service';

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
    private authService : AuthService) { 
    /*
    this.angularFireStorage.ref('/usuarios/7e0KuEYySEdtsby777QrpSxK1Eu1/1').getDownloadURL().subscribe((data:any) => {
      this.downloadURL = data;
      console.log(this.downloadURL);
    });
    */
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
