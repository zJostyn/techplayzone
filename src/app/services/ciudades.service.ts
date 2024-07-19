import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CiudadesService {

  API_URL = 'http://localhost:3000/api/';

  constructor(private http:HttpClient) { }

  getCiudades(){
    return this.http.get(`${this.API_URL}ciudades`);
  }

  //Obtener categoria por id
  getCiudad(id:string){
    return this.http.get(`${this.API_URL}ciudades/${id}`);
  }
  
  //Eliminar categoria
  deleteCiudad(id:string){
    return this.http.delete(`${this.API_URL}ciudades/${id}`);
  }
  
  //Insertar categoria
  insertCiudad(ciudad:Ciudad):Observable<Ciudad>{
    return this.http.post<Ciudad>(`${this.API_URL}ciudades`, ciudad);
  }

  //Actualizar categoria
  updateCiudad(id:string|number,ciudad:Ciudad){
    return this.http.put(`${this.API_URL}ciudades/${id}`, ciudad);
  }
}

export interface Ciudad{
  id: number,
  nombre: string
}