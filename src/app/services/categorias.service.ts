import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  API_URL = 'https://apitechplayzonevercel.vercel.app/api/';

  constructor(private http:HttpClient) { }

  getCategorias(){
    return this.http.get(`${this.API_URL}categorias`);
  }

  //Obtener categoria por id
  getCategoria(id:string){
    return this.http.get(`${this.API_URL}categorias/${id}`);
  }
  
  //Eliminar categoria
  deleteCategoria(id:string){
    return this.http.delete(`${this.API_URL}categorias/${id}`);
  }
  
  //Insertar categoria
  insertCategoria(categoria:Categoria):Observable<Categoria>{
    return this.http.post<Categoria>(`${this.API_URL}categorias`, categoria);
  }

  //Actualizar categoria
  updateCategoria(id:string|number,categoria:Categoria){
    return this.http.put(`${this.API_URL}categorias/${id}`, categoria);
  }
}

export interface Categoria{
  id_categoria: number,
  cat_nombre: string,
  cat_descripcion: string
}