import { Component } from '@angular/core';
import { CartServiceService } from '../../../services/cart-service.service';
import { Product } from '../juegos/juegos.component';
import { CiudadesService } from '../../../services/ciudades.service';
import { Cliente, ClientesService } from '../../../services/clientes.service';
import { Router } from '@angular/router';
import { GenerosService } from '../../../services/generos.service';
import { PedidoCompra, PedidosService } from '../../../services/pedidos.service';
import { DashboardService } from '../../../services/dashboard.service';
import { mergeMap } from 'rxjs/operators';
import { AlertService } from '../../../services/alert.service';
import { Usuario } from '../../../services/usuarios.service';
import { AccesoTokenService } from '../../../services/acceso-token.service';
import { EmailService } from '../../../services/email.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  infoUsuario:Usuario[] = [];
  ciudades:any=[];

  constructor(private alert_service:AlertService, private dashboard_service:DashboardService, private pedidos_service:PedidosService, private generos_service:GenerosService, private cart_service:CartServiceService, private ciudades_service:CiudadesService, private clientes_service:ClientesService, private router:Router, private accesoToken:AccesoTokenService, private emailService:EmailService){
    this.infoUsuario = this.accesoToken.obtenerInfoToken();
  }

  ultimoCliente: number = -1;
  mostrarGenero: any = "";
  mostrarCiudad: any = "";
  clientes: any=[];
  ciudadSeleccionada: any = 0;
  productosAgregados: Product[] = [];
  fechaPedido: any = "";
  subtotal: number = 0;
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
  generos:any=[];
  generoSeleccionado: any = 0;
  pedido: PedidoCompra ={
    id_cliente: -1,
    id_producto: -1,
    cantidad: 0,
    id_usu: 0
  }
  array: any=[];

  datosTarjeta = {
    nombre_titular: "",
    numero_tarjeta: "",
    mes_expiracion: "",
    anio_expiracion: "",
    cvv: ""
  };
  

  ngOnInit(){
    this.listarCiudades();
    this.listarClientes();
    this.listarGeneros();
    this.productosAgregados = this.cart_service.getItems();
    this.subtotal = this.cart_service.getSubtotal();
    this.fechaActual();
  }

  listarCiudades(){
    this.ciudades_service.getCiudades().subscribe(res=>{
      this.ciudades = res;
    });
  }

  listarClientes(){
    this.clientes_service.getClientes().subscribe(res=>{
      this.clientes = res;
    })
  }

  
  listarGeneros(){
    this.generos_service.getGeneros().subscribe(res=>{
      this.generos = res;
    });
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

clienteRepetido(){
  let clienteRegistrado = false;
  for(let cli of this.clientes){
    console.log(cli);
    if(cli.correoelectronico === this.nuevoCliente.cli_correoelectronico){
      clienteRegistrado = true;
      this.nuevoCliente.id_cliente = cli.id;
      this.nuevoCliente.cli_nombre = cli.nombre;
      this.nuevoCliente.cli_apellido = cli.apellido;
      this.obtenerIdGenero(cli.genero);
      this.nuevoCliente.cli_correoelectronico = cli.correoelectronico;
      this.nuevoCliente.cli_telefono = cli.telefono;
      this.obtenerIdCiudad(cli.ciudad);
      this.nuevoCliente.cli_direccion = cli.direccion;
      break;
    }
  }
  return clienteRegistrado;
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

onGenreSelected(event: any) {
  this.generoSeleccionado = event.target.value;
  this.mostrarGenero = this.generoSeleccionado == 1? "M": "F";
  this.nuevoCliente.id_genero = this.generoSeleccionado;
}


procesarPago(){
  this.guardarCliente();
  console.log(this.nuevoCliente);
}

guardarCliente() {
  console.log(this.datosTarjeta);
    if(this.nuevoCliente.id_ciudad == -1 || this.nuevoCliente.id_genero == -1 || this.nuevoCliente.cli_correoelectronico == "" || this.nuevoCliente.cli_nombre == "" || this.nuevoCliente.cli_apellido == "" || this.nuevoCliente.cli_telefono == "" || this.nuevoCliente.cli_direccion == "" || this.datosTarjeta.nombre_titular == "" || this.datosTarjeta.numero_tarjeta == "" || this.datosTarjeta.mes_expiracion == "" || this.datosTarjeta.anio_expiracion == "" || this.datosTarjeta.cvv == ""){
      this.alert_service.showAlert("Faltan datos por rellenar!", "error");
    }else if(this.clienteRepetido()){
      for(let producto of this.productosAgregados){
        this.pedido = {
          id_cliente: this.nuevoCliente.id_cliente,
          id_producto: producto.id,
          cantidad: producto.cantidad,
          id_usu: this.infoUsuario[0].id_usu
        }
        this.pedidos_service.generarPedido(this.pedido).subscribe(res=>{});
      }
      this.alert_service.showAlert("Pedido exitoso!", "exito");
      this.pedidos_service.getIdUltimoPedido().subscribe(
        (dato:any) => {
          const idPedido = dato[0]?.id_pedido + 1;
          setTimeout(()=>{
            this.router.navigate(["public/factura/" + idPedido]);
            this.enviarFactura();
          }, 3000);
        },
        error => {
          console.error('Error al obtener el ID del último pedido:', error);
        }
      );

      this.cart_service.clearCart();
      
    }else{
      this.clientes_service.insertCliente(this.nuevoCliente).pipe(
        mergeMap(() => this.dashboard_service.obtenerUltimoCliente())
      ).subscribe(res => {
        this.array = res;
        for(let producto of this.productosAgregados){
          this.pedido = {
            id_cliente: this.array[0].obtenermaxidcliente,
            id_producto: producto.id,
            cantidad: producto.cantidad,
            id_usu: this.infoUsuario[0].id_usu
          }
          this.pedidos_service.generarPedido(this.pedido).subscribe(res=>{});
        }
      });
      this.alert_service.showAlert("Pedido exitoso!", "exito");
      setTimeout(()=>{
        this.router.navigate(["public/home"]);
      }, 3000);
      this.cart_service.clearCart();
    }
}

formatNumeroTarjeta(event: any) {
  let input = event.target as HTMLInputElement;
  let trimmedValue = input.value.replace(/\D+/g, ''); // Elimina todos los caracteres no numéricos
  let formattedValue = '';

  for (let i = 0; i < trimmedValue.length; i++) {
    if (i > 0 && i % 4 === 0) {
      formattedValue += '-';
    }
    formattedValue += trimmedValue.charAt(i);
  }

  input.value = formattedValue;
  this.datosTarjeta.numero_tarjeta = formattedValue;
}

enviarFactura(){
  const facturaElement = document.getElementById('factura');
  if (facturaElement) {
    const facturaHtml = facturaElement.outerHTML;

    this.emailService
      .sendEmail(this.nuevoCliente.cli_correoelectronico, 'Factura de Compra - TechPlayZone Support', facturaHtml)
      .subscribe(
        (response) => {
          console.log('Correo enviado', response);
        },
        (error) => {
          console.error('Error al enviar el correo', error);
        }
      );
  } else {
    console.error('Elemento factura no encontrado');
  }
}

  censurarNumeroTarjeta(numeroTarjeta: string): string {
    if (numeroTarjeta.length < 4) {
      return numeroTarjeta;
    }
    const ultimosCuatro = numeroTarjeta.slice(-4);
    const censurado = numeroTarjeta.slice(0, -4).replace(/\d/g, '*');
    return `${censurado}${ultimosCuatro}`;
  }

  get numeroTarjetaCensurado(): string {
    return this.censurarNumeroTarjeta(this.datosTarjeta.numero_tarjeta);
  }


  fechaActual() {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mes = fechaActual.getMonth() + 1;
    const anio = fechaActual.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${anio}`;

    this.fechaPedido = fechaFormateada;
  }
}
