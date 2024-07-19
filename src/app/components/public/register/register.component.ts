import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AlertService } from '../../../services/alert.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private title:Title, private router:Router, private servicioUsuario:UsuariosService, private alert_service:AlertService){}

  mostrarContrasena = false;

  registerForm = new FormGroup({
    usu_user : new FormControl('', Validators.required),
    usu_pass : new FormControl('', Validators.required)
  })

  ngOnInit(){
    this.title.setTitle("TechPlayZone - Registrarse");	
  }

  registrarUsuario(form:any){
    if(form.user != '' && form.pass != '') {
      form.id_tipo = '1';
      console.log(form);
      this.servicioUsuario.createUsuario(form).subscribe
      ((data) => {
        setTimeout(() => {
          this.alert_service.showAlert("Usuario creado correctamente!", "exito");
          this.router.navigate(['/public/login']);
        }, 1500);
      }, 
      (error) => {
        this.alert_service.showAlert("El usuario no pudo ser creado!", "error");
      } 
    )
    }

  }

}
