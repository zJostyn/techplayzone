import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentDashboardComponent } from './components/admin/content-dashboard/content-dashboard.component';
import { AdminProductosComponent } from './components/admin/admin-productos/admin-productos.component';
import { AdminCategoriasComponent } from './components/admin/admin-categorias/admin-categorias.component';
import { AdminClientesComponent } from './components/admin/admin-clientes/admin-clientes.component';
import { AdminCiudadesComponent } from './components/admin/admin-ciudades/admin-ciudades.component';
import { AdminPedidosComponent } from './components/admin/admin-pedidos/admin-pedidos.component';
import {HomeComponent} from './components/public/home/home.component';
import {AccesoriosComponent} from './components/public/accesorios/accesorios.component';
import { ConsolasComponent } from './components/public/consolas/consolas.component';
import { JuegosComponent } from './components/public/juegos/juegos.component';
import { FormularioComponent } from './components/public/formulario/formulario.component';
import { ComputadorasComponent } from './components/public/computadoras/computadoras.component';
import { BusquedaComponent } from './components/public/busqueda/busqueda.component';
import { RegisterComponent } from './components/public/register/register.component';
import { LoginpComponent } from './components/public/loginp/loginp.component';
import { FacturaComponent } from './components/public/factura/factura.component';
import { PedidosComponent } from './components/public/pedidos/pedidos.component';
import { AdminEstadisticasComponent } from './components/admin/admin-estadisticas/admin-estadisticas.component';

const routes: Routes = [
  {path:'admin/dashboard', component: ContentDashboardComponent},
  {path: 'admin/productos', component: AdminProductosComponent},
  {path: 'admin/categorias', component: AdminCategoriasComponent},
  {path: 'admin/clientes', component: AdminClientesComponent},
  {path: 'admin/ciudades', component: AdminCiudadesComponent},
  {path: 'admin/pedidos', component: AdminPedidosComponent},
  {path: 'admin/estadisticas', component: AdminEstadisticasComponent},
  {path: 'admin/categorias/:id', component: AdminCategoriasComponent},
  {path: 'public/login', component: LoginpComponent},
  {path: 'public/register', component: RegisterComponent},
  {path: 'public/home', component: HomeComponent},
  {path: 'public/mispedidos', component: PedidosComponent},
  {path: 'public/accesorios', component: AccesoriosComponent},
  {path: 'public/consolas', component: ConsolasComponent},
  {path: 'public/juegos', component: JuegosComponent},
  {path: 'public/computadoras', component: ComputadorasComponent},
  {path: 'public/formulario', component: FormularioComponent},
  {path: 'public/factura/:id', component: FacturaComponent},
  {path: 'public/busqueda/:nombre', component: BusquedaComponent},
 
  {path: '**', pathMatch:'full', redirectTo:'public/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
