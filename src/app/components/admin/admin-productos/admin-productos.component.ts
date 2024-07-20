import { Component } from '@angular/core';
import { ProductosService, Producto } from '../../../services/productos.service';
import { ModalService } from '../../../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from '../../../services/categorias.service';
import { AccesoTokenService } from '../../../services/acceso-token.service';
import { Usuario } from '../../../services/usuarios.service';

@Component({
  selector: 'app-admin-productos',
  templateUrl: './admin-productos.component.html',
  styleUrl: './admin-productos.component.css'
})
export class AdminProductosComponent {
  modalVisible = false;
  categoriaSeleccionada: any;
  categorias: any=[];
  funcion:string ='';
  productos: any=[];
  nuevoProducto: Producto = {
    id_producto: -1,
    id_categoria: -1,
    prod_nombre: "",
    prod_descripcion: "",
    prod_precio: 0,
    prod_stock: 0,
    prod_imagen:""
  };
  mostrarCategoria: any = "";

  constructor(private accesoToken:AccesoTokenService, private categorias_service:CategoriasService, private productos_service:ProductosService, private modalService:ModalService, private router: Router, private activatedRoute:ActivatedRoute){
  }

  ngOnInit(){
    this.accesoToken.verificarLogeado();
    this.listarProductos();
    this.categorias_service.getCategorias().subscribe(data => {
      this.categorias = data;
    });
    console.log(this.productos);
  }

  listarProductos(){
    this.productos_service.getProductos().subscribe(res=>{
      this.productos = res;
    })
  }

  eliminarProducto(id:string){
    const confirmacion = confirm('¿Está seguro que desea eliminar esta producto?');
    if(confirmacion){
      this.productos_service.deleteProducto(id).subscribe(res=>{
        this.listarProductos();
      });
    }
  }

  mostrarModalInsertar() {
    this.modalVisible = true;
    this.mostrarCategoria = "";
    this.funcion = "Añadir nuevo producto";
    this.nuevoProducto = {
      id_producto: -1,
      id_categoria: -1,
      prod_nombre: "",
      prod_descripcion: "",
      prod_precio: 0,
      prod_stock: 0,
      prod_imagen:""
    };
    window.history.replaceState({}, '', `/admin/productos`);
  }

  mostrarModalEditar(producto:any) {
    this.modalVisible = true;
    this.funcion = "Modificar producto";

    this.nuevoProducto.id_producto = producto.id;
    this.obtenerIdCategoria(producto.categoria);
    this.mostrarCategoria = producto.categoria;
    this.nuevoProducto.prod_nombre = producto.nombre;
    this.nuevoProducto.prod_descripcion = producto.descripcion;
    this.nuevoProducto.prod_precio = producto.precio;
    this.nuevoProducto.prod_stock = producto.stock;
    this.nuevoProducto.prod_imagen = producto.imagen;
    window.history.replaceState({}, '', `/admin/productos/${producto.id}`);
  }

  obtenerIdCategoria(nombre:string){
    this.categorias_service.getCategorias().subscribe(
      res =>{
        this.categorias = res;
        for(let i = 0; i < this.categorias.length; i++){
          if(this.categorias[i].cat_nombre === nombre){
            this.nuevoProducto.id_categoria = this.categorias[i].id_categoria;
          }
        }
      }
    );
  }

  cerrarModal() {
    this.modalVisible = false;
    this.router.navigate(['/admin/productos']);
  }

  guardarProducto() {
      if (this.nuevoProducto.id_producto === -1) {
        if(this.nuevoProducto.id_categoria == -1 || this.nuevoProducto.prod_nombre == "" || this.nuevoProducto.prod_descripcion == "" || this.nuevoProducto.prod_precio == 0 || this.nuevoProducto.prod_stock < 0 || this.nuevoProducto.prod_imagen == ""){
          window.alert("Ingrese correctamente los datos");
        }else if(this.productoRepetido()){
          window.alert("La categoria que desea ingresar ya está en la lista");
        }else{
          console.log(this.nuevoProducto);
          this.productos_service.insertProducto(this.nuevoProducto).subscribe(res=>{this.listarProductos();
          });
          this.cerrarModal();
        }
    } else {
      
      if(this.nuevoProducto.id_categoria == -1 || this.nuevoProducto.prod_nombre == "" || this.nuevoProducto.prod_descripcion == "" || this.nuevoProducto.prod_precio == 0 || this.nuevoProducto.prod_stock < 0 || this.nuevoProducto.prod_imagen == ""){
        window.alert("Ingrese correctamente los datos");
      }else{
        console.log(this.nuevoProducto);
        this.productos_service.updateProducto(this.nuevoProducto.id_producto, this.nuevoProducto).subscribe(res=>{this.listarProductos();}, err=>{console.log(err);})
        this.cerrarModal();
        this.router.navigate(['/admin/productos'])
      }
  }
}

  productoRepetido():boolean{
    let result = false;
    for(let prod of this.productos){
      if(prod.prod_nombre == this.nuevoProducto.prod_nombre){
        result = true;
        break;
      }
    }
    return result;
  }

  onCategorySelected(event: any) {
    this.categoriaSeleccionada = event.target.value;
    this.nuevoProducto.id_categoria = this.categoriaSeleccionada;
    for(let i = 0; i < this.categorias.length; i++){
      if(this.categorias[i].id_categoria == event.target.value){
        this.mostrarCategoria = this.categorias[i].cat_nombre;
      }
    }
  }

  
}

