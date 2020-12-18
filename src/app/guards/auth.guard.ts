import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      console.log('Paso por el guardián');
    return this.usuarioService.validarToken().pipe(
        tap((isAuth) => {
          if (!isAuth){
            this.router.navigateByUrl('/login');
          }
        })
      );

  }
}
