import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    // Borra la información de inicio de sesión del localStorage al cerrar sesión
    localStorage.removeItem('isLoggedIn');
  }

  isLoggedIn(): boolean {
    // Verifica si el usuario ha iniciado sesión consultando el localStorage
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
