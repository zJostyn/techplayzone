import { Component } from '@angular/core';
import { ClientesService, Cliente } from '../../../services/clientes.service';
import { CiudadesService } from '../../../services/ciudades.service';
import { GenerosService } from '../../../services/generos.service';
import { ModalService } from '../../../services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { provideProtractorTestingSupport } from '@angular/platform-browser';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { AccesoTokenService } from '../../../services/acceso-token.service';

@Component({
  selector: 'app-admin-clientes',
  templateUrl: './admin-clientes.component.html',
  styleUrl: './admin-clientes.component.css'
})
export class AdminClientesComponent {
  modalVisible = false;
  mostrarGenero: any = "";
  mostrarCiudad: any = "";
  funcion:string ='';
  clientes: any=[];
  nuevoCliente: Cliente = {
    id_cliente: -1,
    id_genero: -1,
    id_ciudad: -1,
    cli_nombre: "",
    cli_apellido: "",
    cli_correoelectronico: "",
    cli_telefono: "",
    cli_direccion: ""
  };
  ciudades:any=[];
  generos:any=[];
  ciudadSeleccionada: any = 0;
  generoSeleccionado: any = 0;
  
  constructor(private accesoToken:AccesoTokenService,private generos_service:GenerosService,private ciudades_service: CiudadesService, private clientes_service:ClientesService, private modalService:ModalService, private router: Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(){
    this.accesoToken.verificarLogeado();

    this.listarClientes();
    this.listarCiudades();
    this.listarGeneros();
    console.log(this.clientes);
  }

  listarClientes(){
    this.clientes_service.getClientes().subscribe(res=>{
      this.clientes = res;
    })
  }

  listarCiudades(){
    this.ciudades_service.getCiudades().subscribe(res=>{
      this.ciudades = res;
    });
  }

  listarGeneros(){
    this.generos_service.getGeneros().subscribe(res=>{
      this.generos = res;
    });
  }

  eliminarCliente(id:string){
    const confirmacion = confirm('¿Está seguro que desea eliminar este cliente?');
    if(confirmacion){
      this.clientes_service.deleteCliente(id).subscribe(res=>{
        this.listarClientes();
      });
    }
  }

  mostrarModalInsertar() {
    this.modalVisible = true;
    this.mostrarGenero = "";
    this.mostrarCiudad = ""
    this.funcion = "Añadir nuevo cliente";
    this.nuevoCliente = {
      id_cliente: -1,
      id_genero: -1,
      id_ciudad: -1,
      cli_nombre: "",
      cli_apellido: "",
      cli_correoelectronico: "",
      cli_telefono: "",
      cli_direccion: ""
    };
    window.history.replaceState({}, '', `/admin/clientes`);
  }

  mostrarModalEditar(cliente:any) {
    this.modalVisible = true;
    this.funcion = "Modificar cliente";
    this.nuevoCliente.id_cliente = cliente.id;
    this.obtenerIdCiudad(cliente.ciudad); 
    this.obtenerIdGenero(cliente.genero);
    this.nuevoCliente.cli_nombre = cliente.nombre;
    this.nuevoCliente.cli_apellido = cliente.apellido;
    this.nuevoCliente.cli_correoelectronico = cliente.correoelectronico;
    this.nuevoCliente.cli_telefono = cliente.telefono;
    this.nuevoCliente.cli_direccion = cliente.direccion; 

    window.history.replaceState({}, '', `/admin/clientes/${cliente.id}`);
  }

  obtenerIdCiudad(nombre:string){

    this.ciudades_service.getCiudades().subscribe(
      res =>{
        this.ciudades = res;
        for(let i = 0; i < this.ciudades.length; i++){
          if(this.ciudades[i].nombre === nombre){
            this.nuevoCliente.id_ciudad = this.ciudades[i].id;
            this.mostrarCiudad = this.ciudades[i].nombre;
          }
        }
      }
    );
  }

  obtenerIdGenero(nombre:string){
    this.generos_service.getGeneros().subscribe(
      res =>{
        this.generos = res;
        for(let i = 0; i < this.generos.length; i++){
          if(this.generos[i].nombre === nombre){
            this.nuevoCliente.id_genero = this.generos[i].id_genero;
            this.mostrarGenero = this.generos[i].nombre;
          }
        }
      }
    );
  }

  cerrarModal() {
    this.modalVisible = false;
    this.router.navigate(['/admin/clientes']);
  }

  guardarCliente() {
      if (this.nuevoCliente.id_cliente === -1) {
        
        if(this.nuevoCliente.id_ciudad == -1 || this.nuevoCliente.id_genero == -1 || this.nuevoCliente.cli_correoelectronico == "" || this.nuevoCliente.cli_nombre == "" || this.nuevoCliente.cli_apellido == "" || this.nuevoCliente.cli_telefono == "" || this.nuevoCliente.cli_direccion == ""){
          window.alert("Ingrese correctamente los datos");
        }else if(this.clienteRepetido()){
          window.alert("El cliente que desea ingresar ya está en la lista");
        }else{
          this.clientes_service.insertCliente(this.nuevoCliente).subscribe(res=>{this.listarClientes();
          });
          this.cerrarModal();
        }
    } else {
      
      if(this.nuevoCliente.id_ciudad == -1 || this.nuevoCliente.id_genero == -1 || this.nuevoCliente.cli_correoelectronico == "" || this.nuevoCliente.cli_nombre == "" || this.nuevoCliente.cli_apellido == "" || this.nuevoCliente.cli_telefono == "" || this.nuevoCliente.cli_direccion == ""){
        window.alert("Ingrese correctamente los datos");
      }else{
        this.clientes_service.updateCliente(this.nuevoCliente.id_cliente, this.nuevoCliente).subscribe(res=>{this.listarClientes();}, err=>{console.log(err);})
        this.cerrarModal();
        this.router.navigate(['/admin/clientes'])
      }
  }
}

  clienteRepetido():boolean{
    let result = false;
    for(let cli of this.clientes){
      if(cli.correoelectronico == this.nuevoCliente.cli_correoelectronico){
        result = true;
        break;
      }
    }
    return result;
  }

  onGenreSelected(event: any) {
    this.generoSeleccionado = event.target.value;
    this.mostrarGenero = this.generoSeleccionado == 1? "M": "F";
    this.nuevoCliente.id_genero = this.generoSeleccionado;
  }

  onCitySelected(event: any) {
    this.ciudadSeleccionada = event.target.value;
    this.nuevoCliente.id_ciudad = this.ciudadSeleccionada;
    for(let i = 0; i < this.ciudades.length; i++){
      if(this.ciudades[i].id == event.target.value){
        this.mostrarCiudad = this.ciudades[i].nombre;
      }
    }
  }
}
