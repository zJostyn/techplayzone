import { Component } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { CartServiceService } from '../../../services/cart-service.service';
import { Product } from '../juegos/juegos.component';
import { Router } from '@angular/router';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-consolas',
  templateUrl: './consolas.component.html',
  styleUrl: './consolas.component.css'
})
export class ConsolasComponent {
  
  constructor(private alert_service:AlertService,private consolas_service:ProductosService, private cartService: CartServiceService, private router:Router){}
  estaSeleccionado: boolean = false;

  isVisible: boolean = true;
  productoSeleccionado: Product = {
    id: -1,
    nombre: "",
    categoria: "",
    descripcion: "",
    precio: 0,
    stock: 0,
    imagen: "", // Agrega el campo imageUrl
    cantidad: 0
  };

  products: Product[] = [];

  ngOnInit(): void {
    this.consolas_service.getConsolas().subscribe((res: any) => {
      res.forEach((consola: any) => {
        this.products.push({
          id: consola.id,
          nombre: consola.nombre,
          categoria: consola.categoria,
          descripcion: consola.descripcion,
          precio: consola.precio,
          stock: consola.stock,
          imagen: consola.imagen,
          cantidad: 0
        });
      });
    });
    console.log(this.cartService.getItems());
  }

  mostrarDetalleProducto(producto: Product) {
    this.estaSeleccionado = true;
    this.productoSeleccionado = producto;
  }

  ordenar(valor: string) {
    switch (valor) {
      case 'ordenAZ':
        this.ordenarAZ(this.products);
        break;
      case 'ordenZA':
        this.ordenarZA(this.products);
        break;
      case 'ordenMayorMenor':
        this.ordenarPorPrecioMayorAMenor(this.products);
        break;
      case 'ordenMenorMayor':
        this.ordenarPorPrecioMenorAMayor(this.products);
        break;
      default:
        break;
    }
  }

  ordenarAZ(productos: Product[]) {
    productos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    console.log(productos);
  }

  ordenarZA(productos: Product[]) {
    productos.sort((a, b) => b.nombre.localeCompare(a.nombre));
    console.log(productos);
  }

  ordenarPorPrecioMenorAMayor(productos: Product[]) {
    productos.sort((a, b) => a.precio - b.precio);
    console.log(productos);
  }

  ordenarPorPrecioMayorAMenor(productos: Product[]) {
    productos.sort((a, b) => b.precio - a.precio);
    console.log(productos);
  }

  addToCart(product: Product) {
    if(product.stock > 0){
      product.cantidad = 1;
    this.cartService.addToCart(product);
    console.log(this.cartService.getItems());
    this.refrescarComponente();
    }else{
      this.alert_service.showAlert("Stock agotado!", "error");
    }
    
  }

  refrescarComponente() {
    this.isVisible = false;
    setTimeout(() => {
      this.isVisible = true;
    });
  }

  addToCartWithCopy(product: Product){
    if(product.stock > 0){
      if(this.productoSeleccionado.cantidad > 0){
        product.cantidad = this.productoSeleccionado.cantidad;
        this.cartService.addToCart(product);
        console.log(this.cartService.getItems());
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["public/consolas"]);
        });
      }else{
        this.alert_service.showAlert("Ingrese el número de copías que desea adquirir", "error");
      }
    }else{
      this.alert_service.showAlert("Stock agotado!", "error");
    }
  }

  comprarProducto(product: Product){
    if(product.stock > 0){
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
    }else{
      this.alert_service.showAlert("Stock agotado!", "error");
    }
  }
  
  cerrarModal() {
    this.estaSeleccionado = false;
  }
}
