import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
import { RouterService } from '../servicios/router.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService : AuthService, private routerService : RouterService) {}

  canActivate(): Observable<boolean> {
    return this.authService.afAuth.authState.pipe(
      map( user => {
        if(!user) {
          this.routerService.navegar('/login');
          return false;
        }
        return true;
      })
    );
  }
  
}
