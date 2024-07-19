import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { ContentDashboardComponent } from './components/admin/content-dashboard/content-dashboard.component';
import { AdminProductosComponent } from './components/admin/admin-productos/admin-productos.component';
import { AdminCategoriasComponent } from './components/admin/admin-categorias/admin-categorias.component';
import { AdminClientesComponent } from './components/admin/admin-clientes/admin-clientes.component';
import { AdminCiudadesComponent } from './components/admin/admin-ciudades/admin-ciudades.component';
import { AdminPedidosComponent } from './components/admin/admin-pedidos/admin-pedidos.component';
import { BarraSuperiorComponent } from './components/admin/barra-superior/barra-superior.component';
import { JuegosComponent } from './components/public/juegos/juegos.component';
import { ComputadorasComponent } from './components/public/computadoras/computadoras.component';
import { ConsolasComponent } from './components/public/consolas/consolas.component';
import { AccesoriosComponent } from './components/public/accesorios/accesorios.component';
import { HomeComponent } from './components/public/home/home.component';
import { NavbarComponent } from './components/public/shared/navbar/navbar.component';
import { FormularioComponent } from './components/public/formulario/formulario.component';
import { FooterComponent } from './components/public/footer/footer.component';
import { BusquedaComponent } from './components/public/busqueda/busqueda.component';
import { RegisterComponent } from './components/public/register/register.component';
import { LoginpComponent } from './components/public/loginp/loginp.component';
import { FacturaComponent } from './components/public/factura/factura.component';
import { PedidosComponent } from './components/public/pedidos/pedidos.component';
import { AdminEstadisticasComponent } from './components/admin/admin-estadisticas/admin-estadisticas.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ContentDashboardComponent,
    AdminProductosComponent,
    AdminCategoriasComponent,
    AdminClientesComponent,
    AdminCiudadesComponent,
    AdminPedidosComponent,
    BarraSuperiorComponent,
    JuegosComponent,
    ComputadorasComponent,
    ConsolasComponent,
    AccesoriosComponent,
    HomeComponent,
    NavbarComponent,
    FormularioComponent,
    FooterComponent,
    BusquedaComponent,
    RegisterComponent,
    LoginpComponent,
    FacturaComponent,
    PedidosComponent,
    AdminEstadisticasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
