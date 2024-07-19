import { Injectable } from '@angular/core';
import { Product } from '../components/public/juegos/juegos.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {

  private cartKey = 'cartItems';
  private items: Product[] = [];
  private numProductosSubject = new Subject<number>();
  numProductos$ = this.numProductosSubject.asObservable();


  constructor() {
    // Al inicializar el servicio, intenta cargar los elementos del carrito desde el localStorage
    const storedItems = localStorage.getItem(this.cartKey);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.emitNumProductos();
    }
  }

  private saveCart() {
    // Guarda los elementos del carrito en localStorage
    localStorage.setItem(this.cartKey, JSON.stringify(this.items));
  }

  addToCart(product: Product) {
    this.items.push(product);
    this.saveCart(); // Guarda el carrito actualizado en localStorage
    this.emitNumProductos();
  }

  deleteItem(productId: number) {
    const index = this.items.findIndex(item => item.id === productId); // Encuentra el índice del elemento con el ID del producto
    if (index !== -1) { // Si se encuentra el índice válido
      this.items.splice(index, 1); // Elimina el elemento en el índice encontrado
      this.saveCart(); // Guarda el carrito actualizado en localStorage
      this.emitNumProductos();
    }
  }
  

  getItems() {
    return this.items;
  }

  getSubtotal(){
    let subtotal = 0;
    for(let i = 0; i < this.items.length; i++){
      subtotal += this.items[i].precio * this.items[i].cantidad;
    }
    return subtotal;
  }

  getNumItems(){
    return this.items.length;
  }

  clearCart() {
    this.items = [];
    this.saveCart(); // Guarda el carrito vacío en localStorage
    return this.items;
  }

  private emitNumProductos(): void {
    this.numProductosSubject.next(this.items.length);
  }
}
