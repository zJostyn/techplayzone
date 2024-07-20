import { Component } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { Router } from '@angular/router';
import { AccesoTokenService } from '../../../services/acceso-token.service';

@Component({
  selector: 'app-content-dashboard',
  templateUrl: './content-dashboard.component.html',
  styleUrl: './content-dashboard.component.css'
})
export class ContentDashboardComponent {

  constructor(private accesoToken:AccesoTokenService, private router:Router,private dashboard_service:DashboardService){}


  nClientes: string = '';
  nProductos: string = '';
  nPedidos: string = '';
  nGanancias: string = '';
  array: any=[];

  ngOnInit(){
    this.accesoToken.verificarLogeado();

    this.dashboard_service.getNClientes().subscribe(res=>{
      this.array = res;
      this.nClientes = this.array[0].obtener_numero_clientes;});
      
    this.dashboard_service.getNProductos().subscribe(res=>{
      this.array = res;
      this.nProductos = this.array[0].obtener_numero_productos;});
      this.dashboard_service.getNPedidos().subscribe(res=>{
        this.array = res;
        this.nPedidos = this.array[0].obtener_numero_pedidos;});
        this.dashboard_service.getGanancias().subscribe(res=>{
          this.array = res;
          this.nGanancias = this.array[0].sumar_total_detalles_pedido;});


  }

}
