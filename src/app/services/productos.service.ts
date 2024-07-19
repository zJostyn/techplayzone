import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  API_URL = 'http://localhost:3000/api/';

  constructor(private http:HttpClient) { }
  
  getProductos(){
    return this.http.get(`${this.API_URL}productos`);
  }

  getProductoNom(nombre:any){
    const body = { nombre: nombre };
    return this.http.post(`${this.API_URL}busqueda`, body);
  }

  //Obtener ciudad por id
  getProducto(id:string){
    return this.http.get(`${this.API_URL}productos/${id}`);
  }

  getJuegos(){
    return this.http.get(`${this.API_URL}juegos`);
  }

  getAccesorios(){
    return this.http.get(`${this.API_URL}accesorios`);
  }

  getComputadoras(){
    return this.http.get(`${this.API_URL}computadoras`);
  }

  getConsolas(){
    return this.http.get(`${this.API_URL}consolas`);
  }

  //Eliminar ciudad
  deleteProducto(id:string){
    return this.http.delete(`${this.API_URL}productos/${id}`);
  }
  
  //Insertar ciudad
  insertProducto(producto:Producto):Observable<Producto>{
    return this.http.post<Producto>(`${this.API_URL}productos`, producto);
  }

  //Actualizar ciudad
  updateProducto(id:string|number,producto:Producto){
    return this.http.put(`${this.API_URL}productos/${id}`, producto);
  }



}

export interface Producto{
  id_producto: number,
  id_categoria: number,
  prod_nombre: string,
  prod_descripcion: string,
  prod_precio: number,
  prod_stock: number,
  prod_imagen:string
}
