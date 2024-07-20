import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  API_URL = 'https://apitechplayzonevercel.vercel.app/api/';

  constructor(private http:HttpClient) { }

  getNClientes(){
    return this.http.get(`${this.API_URL}nClientes`);
  }

  getNProductos(){
    return this.http.get(`${this.API_URL}nProductos`);
  }

  getNPedidos(){
    return this.http.get(`${this.API_URL}nPedidos`);
  }

  getGanancias(){
    return this.http.get(`${this.API_URL}nGanancias`);
  }

  obtenerUltimoCliente(){
    return this.http.get(`${this.API_URL}ultimoCliente`);
  }
}
