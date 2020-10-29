import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { RouterService } from '../servicios/router.service';
import { map } from 'rxjs/operators';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class ProfesionalGuard implements CanActivate {

  profesionales: Observable<any[]>;
  listaProfesionales: any[];

  constructor(private authService : AuthService, private routerService : RouterService, private db : AngularFireDatabase) {
    this.profesionales = this.db.list('usuarios').valueChanges(); 
    this.profesionales.subscribe(profesionales => {
      this.listaProfesionales = profesionales;
    });
  }

  canActivate(): Observable<boolean> {
    return this.authService.afAuth.authState.pipe(
      map( user => {
        for (const profesional of this.listaProfesionales) {
          if(profesional.perfil == "Profesional") {
            if(profesional.habilitado) {
              return true;
            }
          }
        }
        this.routerService.navegar('/login');
        return false;
      })
    );
  }
}
