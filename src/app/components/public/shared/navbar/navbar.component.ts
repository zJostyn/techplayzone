import { Component, AfterViewInit, Renderer2, OnDestroy} from '@angular/core';
import { CartServiceService } from '../../../../services/cart-service.service';
import { Subscription } from 'rxjs';
import { Product } from '../../juegos/juegos.component';
import { Router } from '@angular/router';
import { AlertService } from '../../../../services/alert.service';
import { AccesoTokenService } from '../../../../services/acceso-token.service';
import { Usuario } from '../../../../services/usuarios.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  infoUsuario:Usuario[] = [];
  numProductos: number = 0;
  private numProductosSubscription: Subscription | undefined;
  mostrarCarrito: boolean = false;
  productosAgregados: Product[] = [];
  subtotal: number = 0;
  private loginBtn: HTMLButtonElement | null = null;
  private panel: HTMLDivElement | null = null;

  constructor(private accesoToken:AccesoTokenService,private alert_service:AlertService,private cart_service:CartServiceService, private router:Router, private renderer: Renderer2){
    this.infoUsuario = this.accesoToken.obtenerInfoToken();
  }

  ngOnInit():void{
    this.subtotal = this.cart_service.getSubtotal();
    this.productosAgregados = this.cart_service.getItems();
    this.numProductos = this.cart_service.getNumItems();
    this.numProductosSubscription = this.cart_service.numProductos$.subscribe(numProductos => {
      this.numProductos = numProductos;
    });
  }

  ngAfterViewInit(): void {
    this.loginBtn = document.getElementById('loginBtn') as HTMLButtonElement;
    this.panel = document.getElementById('panel') as HTMLDivElement;

    if (this.loginBtn && this.panel) {
      this.loginBtn.addEventListener('click', this.togglePanel);
      this.renderer.listen('document', 'click', this.hidePanelOnClickOutside);
    }
  }

  ngOnDestroy(): void {
    if (this.numProductosSubscription) {
      this.numProductosSubscription.unsubscribe();
    }
    if (this.loginBtn) {
      this.loginBtn.removeEventListener('click', this.togglePanel);
    }
  }

  eliminarProducto(number:number){
    this.cart_service.deleteItem(number);
    this.subtotal = this.cart_service.getSubtotal();
    this.productosAgregados = this.cart_service.getItems();
    this.numProductos = this.cart_service.getNumItems();
  }

  abrirCarrito(): void {
    this.mostrarCarrito = true;
  }

  cerrarCarrito(): void {
    this.mostrarCarrito = false;
  }

  generarPedido(){
    if(this.cart_service.getNumItems() > 0){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(["public/formulario"]);
      });
    }else{
      this.alert_service.showAlert("No hay productos en la cola!", "error");
    }
  }

  buscarProducto(nombre:string) {
    console.log(nombre);
    this.router.navigate(['public/busqueda', nombre]);
  }

  togglePanel = () => {
    if (this.panel?.classList.contains('hidden')) {
      this.panel.classList.remove('hidden');
    } else {
      this.panel?.classList.add('hidden');
    }
  };

  hidePanelOnClickOutside = (event: MouseEvent) => {
    if (this.panel && !this.panel.contains(event.target as Node) && !this.loginBtn?.contains(event.target as Node)) {
      this.panel.classList.add('hidden');
    }
  };

  Salir() {
    this.accesoToken.salirPublic();
  }
}
