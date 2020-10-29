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
  
  @Input() perfil : boolean = false;
  @Input() salir : boolean = false;

  constructor(private routerService : RouterService, private authService : AuthService){}

  ngOnInit(): void {}

  desloguerarseSalir() {
    this.authService.desloguearse();
    this.routerService.navegar('');
  }

  mostrarPerfil() {
  this.routerService.navegar('perfil');
  }
}
