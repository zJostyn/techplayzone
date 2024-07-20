import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  API_URL = 'https://apitechplayzonevercel.vercel.app//api/';

  constructor(private http:HttpClient) { }

  getUsuarios(){
    return this.http.get(`${this.API_URL}usuarios`);
  }

  createUsuario(usuario:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(`${this.API_URL}usuario`, usuario);
  }

  verificarUsuario(usuario:Usuario){
    return this.http.post(`${this.API_URL}verificarusuario`, usuario);
  }
}

export interface Usuario{
  id_usu: number,
  usu_user: string
  usu_pass: string
  id_tipo: string
}
