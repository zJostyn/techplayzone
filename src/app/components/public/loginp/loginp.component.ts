import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { AccesoTokenService } from '../../../services/acceso-token.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-loginp',
  templateUrl: './loginp.component.html',
  styleUrl: './loginp.component.css'
})
export class LoginpComponent {
  constructor(private title:Title, private router:Router, private alert_service:AlertService, private servicioUsuario:UsuariosService, private accesoToken:AccesoTokenService){}

  mostrarContrasena = false;

  loginForm = new FormGroup({
    user : new FormControl('', Validators.required),
    pass : new FormControl('', Validators.required)
  })

  ngOnInit(){
    this.title.setTitle("TechPlayZone - Iniciar sesión");
    this.accesoToken.verificarTokenLogin();
  }

  ingresar(form:any){
    if(form.email != '' && form.pass != '') {
      this.servicioUsuario.verificarUsuario(form).subscribe
      ((data) => {
        this.alert_service.showAlert("Ingresaste correctamente!", "exito");
        this.accesoToken.crearToken(data);
        setTimeout(() => {
          this.alert_service.cerrar();
        }, 1000);
      }, 
      (error) => {
        console.log(error.error.message);
        this.alert_service.showAlert("Usuario o contraseña incorrectos", "error");
      } 
    )
    } else {
      this.alert_service.showAlert("Usuario o contraseña vacios", "error");
    }
}

}
