import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  API_URL = 'https://apitechplayzonevercel.vercel.app//api/';

  constructor(private http:HttpClient) { }

  getPedido(id:any){
    return this.http.get(`${this.API_URL}pedido/${id}`);
  }

  getPedidos(){
    return this.http.get(`${this.API_URL}pedidos`);
  }

  getPedidosUsuario(id:any){
    return this.http.get(`${this.API_URL}mispedidos/${id}`);
  }

  getIdUltimoPedido(){
    return this.http.get(`${this.API_URL}ultimopedido`);
  }

  updateEstadoPedido(id:string|number,pedido:Pedido){
    return this.http.put(`${this.API_URL}pedidos/${id}`, pedido);
  }

   //Generar pedido
   generarPedido(pedido:PedidoCompra):Observable<PedidoCompra>{
    return this.http.post<PedidoCompra>(`${this.API_URL}pedidos`, pedido);
  }

}

export interface Pedido{
  id_estadopedido: number
}

export interface PedidoCompra{
  id_cliente: number,
  id_producto: number,
  cantidad: number,
  id_usu: number,
}