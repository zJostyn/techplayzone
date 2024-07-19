import { Component } from '@angular/core';
import { PedidosService, Pedido } from '../../../services/pedidos.service';
import { ModalService } from '../../../services/modal.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router'
import { AccesoTokenService } from '../../../services/acceso-token.service';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-admin-pedidos',
  templateUrl: './admin-pedidos.component.html',
  styleUrl: './admin-pedidos.component.css'
})
export class AdminPedidosComponent {
  
  pedidos: any=[];
  actualizarPedido: Pedido = {
  id_estadopedido: -1
  };
  
  constructor(private accesoToken:AccesoTokenService,private pedidos_service:PedidosService, private modalService:ModalService, private router: Router, private activatedRoute:ActivatedRoute, private emailService:EmailService){}

  ngOnInit(){
    this.accesoToken.verificarLogeado();

    this.listarPedidos();
  }

  listarPedidos(){
    this.pedidos_service.getPedidos().subscribe(res=>{
      this.pedidos = res;
    })
  }

  getColor(estado: string): string {
    switch (estado) {
      case 'Pendiente':
        return 'blue';
      case 'En proceso':
        return 'orange';
      case 'Entregado':
        return 'green';
      default:
        return '';
    }
  }

  cambiarEstado(pedido: any, id:number) {
    let idAux = -1;
    window.history.replaceState({}, '', `/admin/pedidos/${id}`);

    switch (pedido.estado) {
      case 'Pendiente':
        pedido.estado = 'En proceso';
        idAux = 2;
        break;
      case 'En proceso':
        pedido.estado = 'Entregado';
        idAux = 3;
        break;
      case 'Entregado':
        pedido.estado = 'Pendiente';
        idAux = 1;
        break;
      default:
        break;
    }

    this.pedidos_service.updateEstadoPedido(id, {id_estadopedido: idAux}).subscribe(res=>{}, err=>{console.log(err);})
    this.router.navigate(['/admin/pedidos'])
  }
  
}
