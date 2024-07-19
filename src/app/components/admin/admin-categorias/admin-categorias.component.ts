import { Component } from '@angular/core';
import { CategoriasService, Categoria } from '../../../services/categorias.service';
import { ModalService } from '../../../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth.service';
import { AccesoTokenService } from '../../../services/acceso-token.service';

@Component({
  selector: 'app-admin-categorias',
  templateUrl: './admin-categorias.component.html',
  styleUrl: './admin-categorias.component.css'
})
export class AdminCategoriasComponent {

  modalVisible = false;
  funcion:string ='';
  categorias: any=[];
  nuevaCategoria: Categoria = {
    id_categoria: -1,
    cat_nombre: '',
    cat_descripcion: ''
  };
  

  constructor(private accesoToken:AccesoTokenService,private categorias_service:CategoriasService, private modalService:ModalService, private router: Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.accesoToken.verificarLogeado();


    this.listarCategorias();
    console.log(this.categorias);
  }

  listarCategorias(){
    this.categorias_service.getCategorias().subscribe(res=>{
      this.categorias = res;
    })
  }

  eliminarCategoria(id:string){
    const confirmacion = confirm('¿Está seguro que desea eliminar esta categoria?');
    if(confirmacion){
      this.categorias_service.deleteCategoria(id).subscribe(res=>{
        this.listarCategorias();
      });
    }
  }

  mostrarModalInsertar() {
    this.modalVisible = true;
    this.funcion = "Añadir nueva categoría";
    this.nuevaCategoria = {
      id_categoria: -1,
      cat_nombre: '',
      cat_descripcion: ''
    };
    window.history.replaceState({}, '', `/admin/categorias`);
  }

  mostrarModalEditar(categoria:Categoria) {
    this.modalVisible = true;
    this.funcion = "Modificar categoría";
    this.nuevaCategoria.cat_nombre = categoria.cat_nombre;
    this.nuevaCategoria.cat_descripcion = categoria.cat_descripcion; 
    this.nuevaCategoria = categoria;
    window.history.replaceState({}, '', `/admin/categorias/${categoria.id_categoria}`);
  }

  cerrarModal() {
    this.modalVisible = false;
    this.router.navigate(['/admin/categorias']);
  }

  
  guardarCategoria() {
      if (this.nuevaCategoria.id_categoria === -1) {
        
        if(this.nuevaCategoria.cat_nombre == "" || this.nuevaCategoria.cat_descripcion == ""){
          window.alert("Ingrese correctamente los datos");
        }else if(this.categoriaRepetida()){
          window.alert("La categoria que desea ingresar ya está en la lista");
        }else{
          this.categorias_service.insertCategoria(this.nuevaCategoria).subscribe(res=>{this.listarCategorias();
          });
          this.cerrarModal();
        }
    } else {
      
      if(this.nuevaCategoria.cat_nombre == "" || this.nuevaCategoria.cat_descripcion == ""){
        window.alert("Ingrese correctamente los datos");
      }else{
        this.categorias_service.updateCategoria(this.nuevaCategoria.id_categoria, this.nuevaCategoria).subscribe(res=>{this.listarCategorias();}, err=>{console.log(err);})
        this.cerrarModal();
        this.router.navigate(['/admin/categorias'])
      }
  }
}

  categoriaRepetida():boolean{
    let result = false;
    for(let cat of this.categorias){
      if(cat.cat_nombre == this.nuevaCategoria.cat_nombre){
        result = true;
        break;
      }
    }
    return result;
  }
}

