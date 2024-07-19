import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

 
  API_URL = 'http://localhost:3000/api/';

  constructor(private http:HttpClient) { }

  getClientes(){
    return this.http.get(`${this.API_URL}clientes`);
  }

  //Obtener categoria por id
  getCliente(id:string){
    return this.http.get(`${this.API_URL}clientes/${id}`);
  }

  //Eliminar categoria
  deleteCliente(id:string){
    return this.http.delete(`${this.API_URL}clientes/${id}`);
  }
  
  //Insertar categoria
  insertCliente(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(`${this.API_URL}clientes`, cliente);
  }

  //Actualizar categoria
  updateCliente(id:string|number,cliente:Cliente){
    return this.http.put(`${this.API_URL}clientes/${id}`, cliente);
  }
}

export interface Cliente{
  id_cliente: number,
  id_genero: number,
  id_ciudad: number,
  cli_nombre: string,
  cli_apellido: string,
  cli_correoelectronico: string,
  cli_telefono: string,
  cli_direccion: string
}