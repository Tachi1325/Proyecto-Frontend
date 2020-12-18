import { Component} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updatepass',
  templateUrl: './updatepass.component.html',
  styleUrls: ['./updatepass.component.css']
})
export class UpdatepassComponent {

  public formSubmitted = false;
  public updatePassForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required]],
      password2: ['', [Validators.required]]
    },
    {
      validators: this.passwordsIguales('password', 'password2')
    }
  )
  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) { }

  campoNoValido(campo: string): boolean {
    if (this.updatePassForm.get(campo).invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  contrasenasNoValidas() {
    const pass1 = this.updatePassForm.get('password').value;
    const pass2 = this.updatePassForm.get('password2').value;
    if (pass1 !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    };
  }

  updatePassword(){
    this.formSubmitted = true;
    if(this.updatePassForm.valid) {
      this.usuarioService.updatePassword(this.updatePassForm.value).subscribe(
        (resp: any) => {
          if(resp.status) {
            Swal.fire({
              title: 'Exito!',
              text: resp.message,
              icon:'success',
              confirmButtonText: 'Ok'
            }).then((result) => {
              if(result.isConfirmed) {
                this.router.navigateByUrl('/login');
              }
            });
          } else {
            Swal.fire({
              title: 'Error!',
              text: resp.message,
              icon:'error',
              confirmButtonText: 'Ok'
            });
          }
        },
        (err) => console.warn(err)
      );
    } else {
      console.log('Formulario no válido');
    }
  }

}
