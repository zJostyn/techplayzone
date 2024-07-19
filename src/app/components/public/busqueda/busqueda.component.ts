import { Component } from '@angular/core';
import { AlertService } from '../../../services/alert.service';
import { ProductosService } from '../../../services/productos.service';
import { CartServiceService } from '../../../services/cart-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {

  constructor(private alert_service:AlertService, private productos_service:ProductosService, private cartService:CartServiceService, private router: Router, private activatedRoute:ActivatedRoute){}

  isVisible: boolean = true;
  estaSeleccionado: boolean = false;
  productoSeleccionado: Product = {
    id: -1,
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    imagen: "",
    cantidad: 0
  };

  products: Product[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.products.splice(0, this.products.length);
      this.productos_service.getProductoNom(params ['nombre']).subscribe((res: any) => {
        res.forEach((producto: any) => {
          this.products.push({
            id: producto.id,
            nombre: producto.nombre,
            categoria: producto.categoria,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            imagen: producto.imagen,
            cantidad: 0
          });
        });
      });
      console.log(this.cartService.getItems());
    });

  }

  mostrarDetalleProducto(producto: Product) {
    this.estaSeleccionado = true;
    this.productoSeleccionado = producto;
  }

  addToCart(product: Product) {
    product.cantidad = 1;
    this.cartService.addToCart(product);
    console.log(this.cartService.getItems());
    this.refrescarComponente();
  }

  addToCartWithCopy(product: Product){
    if(this.productoSeleccionado.cantidad > 0){
      product.cantidad = this.productoSeleccionado.cantidad;
      this.cartService.addToCart(product);
      console.log(this.cartService.getItems());
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(["public/", product.categoria]);
      });
    }else{
      this.alert_service.showAlert("Ingrese el número de copías que desea adquirir", "error");
    }
  }

  cerrarModal() {
    this.estaSeleccionado = false;
  }

  refrescarComponente() {
    this.isVisible = false;
    setTimeout(() => {
      this.isVisible = true;
    });
  }

  comprarProducto(product: Product){
    if(this.productoSeleccionado.cantidad > 0){
      product.cantidad = this.productoSeleccionado.cantidad;
      this.cartService.clearCart();
      this.cartService.addToCart(product);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(["public/formulario"]);
      });
    }else{
      this.alert_service.showAlert("Ingrese el número de copías que desea adquirir", "error");
    }
  }

}

export interface Product {
  id: number,
  nombre: string,
  categoria: string,
  descripcion: string,
  precio: number,
  stock: number,
  imagen: string,
  cantidad: number
}
