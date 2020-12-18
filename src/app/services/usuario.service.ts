import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { PasswordForm } from '../interfaces/updatepass-form.interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  crearUsuario(formData: RegisterForm){
    return this.http.post(`${base_url}/usuarios`, formData);
  }

  login(formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data);
      })
    );
  }

  loginGoogle(token){
    return this.http.post(`${base_url}/login/google`, { token }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data);
      })
    );
  }

  validarToken():Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/update`, {
      headers: {
        'x-token': token
      },
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.data);
      }),
      map((resp) => {
        if(resp.data)
          return true;
        else
          return false;
      }),
      catchError((error) => of(false))
    );
  }

  updatePassword(formData: PasswordForm) {
    return this.http.put(`${base_url}/usuarios/updatepassword`, formData);
  }

}
