import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from '../../../services/pedidos.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css'
})
export class FacturaComponent implements OnInit{
  id: string | null;
  pedido: any[] = [];

  constructor(private arouter:ActivatedRoute, private pedidos:PedidosService) {
    this.id = this.arouter.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.obtenerPedido();
  }

  obtenerPedido() {
    this.pedidos.getPedido(this.id).subscribe((data: any) => {
      this.pedido = data;
      console.log(this.pedido);
    });
  }

  Imprimir() {
    window.print();
  }
}
