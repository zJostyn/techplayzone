import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AccesoTokenService {

  constructor(private router:Router) { }

  Info:Usuario [] = [];

  obtenerInfoToken() {
    this.Info = JSON.parse(localStorage.getItem('tokenusuario') || '{}');
    return this.Info;
  }
  
  verificarTokenLogin() {
    if(localStorage.getItem('tokenusuario')) {
      this.obtenerInfoToken();
      if(this.Info[0].id_tipo == '1') {
        this.router.navigate(['public/home']);
      } else {
        this.router.navigate(['admin/dashboard']);
      }    
    }
  }

  verificarLogeado() {
    if(!localStorage.getItem('tokenusuario')) {
      this.router.navigate(['public/login']);
    }
  }

  crearToken(data:any) {
    localStorage.setItem('tokenusuario', JSON.stringify(data));
    this.obtenerInfoToken();
    setTimeout(() => {
      if(this.Info[0].id_tipo == '1') {
        this.router.navigate(['public/home']);
      } else {
        this.router.navigate(['admin/dashboard']);
      }
    }, 1100);
  }

  salirAdmin() {
    localStorage.removeItem('tokenusuario');
    this.router.navigate(['public/home'])
  }
  
  salirPublic() {
    localStorage.removeItem('tokenusuario');
    window.location.reload();
  }
}
