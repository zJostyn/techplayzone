import { Component } from '@angular/core';
import { Usuario } from '../../../services/usuarios.service';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';
import { AccesoTokenService } from '../../../services/acceso-token.service';
import { PedidosService } from '../../../services/pedidos.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {
  infoUsuario:Usuario[] = [];
  pedidos: any=[];
  constructor(private accesoToken:AccesoTokenService,private alert_service:AlertService, private pedidos_service:PedidosService, private router:Router){
    this.infoUsuario = this.accesoToken.obtenerInfoToken();
  }
  
  ngOnInit(){
    this.accesoToken.verificarLogeado();

    this.listarPedidos();
  }

  listarPedidos(){
    this.pedidos_service.getPedidosUsuario(this.infoUsuario[0].id_usu).subscribe(res=>{
      this.pedidos = res;
    })
  }

  verFactura(id:any) {
    this.router.navigate(['public/factura/' + id]);
  }
}
