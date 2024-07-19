import { Component } from '@angular/core';
import { CiudadesService, Ciudad } from '../../../services/ciudades.service';
import { ModalService } from '../../../services/modal.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AccesoTokenService } from '../../../services/acceso-token.service';

@Component({
  selector: 'app-admin-ciudades',
  templateUrl: './admin-ciudades.component.html',
  styleUrl: './admin-ciudades.component.css'
})
export class AdminCiudadesComponent {

  modalVisible = false;
  funcion:string ='';
  ciudades: any=[];
  nuevaCiudad: Ciudad = {
    id: -1,
    nombre: ""
  };
  

  constructor(private accesoToken:AccesoTokenService,private ciudades_service:CiudadesService, private modalService:ModalService, private router: Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.accesoToken.verificarLogeado();
    
    this.listarCiudades();
    console.log(this.ciudades);
  }

  listarCiudades(){
    this.ciudades_service.getCiudades().subscribe(res=>{
      this.ciudades = res;
    })
  }

  eliminarCiudad(id:string){
    const confirmacion = confirm('¿Está seguro que desea eliminar esta ciudad?');
    if(confirmacion){
      this.ciudades_service.deleteCiudad(id).subscribe(res=>{
        this.listarCiudades();
      });
    }
  }

  mostrarModalInsertar() {
    this.modalVisible = true;
    this.funcion = "Añadir nueva ciudad";
    this.nuevaCiudad = {
      id: -1,
      nombre: ""
    };
    window.history.replaceState({}, '', `/admin/ciudades`);
  }

  mostrarModalEditar(ciudad:Ciudad) {
    this.modalVisible = true;
    this.funcion = "Modificar ciudad";
    this.nuevaCiudad.nombre = ciudad.nombre;
    this.nuevaCiudad.id = ciudad.id; 
    
    window.history.replaceState({}, '', `/admin/categorias/${ciudad.id}`);
  }

  cerrarModal() {
    this.modalVisible = false;
    this.router.navigate(['/admin/ciudades']);
  }

  
  guardarCiudad() {
      if (this.nuevaCiudad.id === -1) {
        
        if(this.nuevaCiudad.nombre == ""){
          window.alert("Ingrese correctamente los datos");
        }else if(this.ciudadRepetida()){
          window.alert("La ciudad que desea ingresar ya está en la lista");
        }else{
          this.ciudades_service.insertCiudad(this.nuevaCiudad).subscribe(res=>{this.listarCiudades();
          });
          this.cerrarModal();
        }
    } else {
      
      if(this.nuevaCiudad.nombre == ""){
        window.alert("Ingrese correctamente los datos");
      }else{
        this.ciudades_service.updateCiudad(this.nuevaCiudad.id, this.nuevaCiudad).subscribe(res=>{this.listarCiudades();}, err=>{console.log(err);})
        this.cerrarModal();
        this.router.navigate(['/admin/ciudades'])
      }
  }
}

  ciudadRepetida():boolean{
    let result = false;
    for(let ciu of this.ciudades){
      if(ciu.nombre == this.nuevaCiudad.nombre){
        result = true;
        break;
      }
    }
    return result;
  }
}
