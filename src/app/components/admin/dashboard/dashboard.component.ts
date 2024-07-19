import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{

  constructor(private router: Router, private title:Title) {}

  ngOnInit() {
    this.title.setTitle("TechPlayZone - Administrador");
    
    this.esDashboard = this.router.url === '/admin/dashboard';
    this.esCategorias = this.router.url === '/admin/categorias';
    this.esProductos = this.router.url === '/admin/productos';
    this.esClientes = this.router.url === '/admin/clientes';
    this.esCiudades = this.router.url === '/admin/ciudades';
    this.esPedidos = this.router.url === '/admin/pedidos';
    this.esEstadisticas = this.router.url === '/admin/estadisticas';
  }
  
  esDashboard: boolean =false;
  esCategorias: boolean =false;
  esProductos: boolean =false;
  esClientes: boolean =false;
  esCiudades: boolean =false;
  esPedidos: boolean =false;
  esEstadisticas: boolean =false;

}
