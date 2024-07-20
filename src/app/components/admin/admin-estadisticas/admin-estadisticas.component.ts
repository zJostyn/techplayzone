import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AccesoTokenService } from '../../../services/acceso-token.service';
import { Usuario } from '../../../services/usuarios.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-estadisticas',
  templateUrl: './admin-estadisticas.component.html',
  styleUrl: './admin-estadisticas.component.css'
})
export class AdminEstadisticasComponent implements OnInit {

  infoUsuario: Usuario[] = [];
  private myChart1: Chart | null = null;
  private myChart2: Chart | null = null;
  private myChart3: Chart | null = null;

  constructor(private accesoToken: AccesoTokenService) {

  } ngOnInit(): void {
    this.accesoToken.verificarLogeado();
    this.infoUsuario = this.accesoToken.obtenerInfoToken();
    this.Estadisticas1('2023');
    this.ActualizarGrafico1('2023');
    this.Estadisticas2('3');
    this.ActualizarGrafico2('3');
    this.Estadisticas3('2024','7');
    this.ActualizarGrafico3('2024','7');
  }

  crearGrafico1(año: any) {
    if (this.myChart1) { //Si ya existe el grafico, lo va a eliminar
      this.myChart1.destroy();
      this.Estadisticas1(año); // Para luego cargarlo vacio pero con el titulo del año
      this.ActualizarGrafico1(año); // Y con esto ya cargarle los datos del año elegido
    }
  }

  crearGrafico2(año: any) {
    if (this.myChart2) { //Si ya existe el grafico, lo va a eliminar
      this.myChart2.destroy();
      this.Estadisticas2(año); // Para luego cargarlo vacio pero con el titulo del año
      this.ActualizarGrafico2(año); // Y con esto ya cargarle los datos del año elegido
    }
  }

  crearGrafico3(año: any, mes:any) {
    if (this.myChart3) { //Si ya existe el grafico, lo va a eliminar
      this.myChart3.destroy();
      this.Estadisticas3(año, mes); // Para luego cargarlo vacio pero con el titulo del año
      this.ActualizarGrafico3(año, mes); // Y con esto ya cargarle los datos del año elegido
    }
  }

  Estadisticas1(año: any) {
    Chart.register(...registerables);

    const ctx = document.getElementById('myChart1') as HTMLCanvasElement | null;

    if (ctx) {

      function generarColorAleatorio() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = 0.5; // Transparencia del color
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      }

      const coloresAleatorios = Array.from({ length: 12 }, generarColorAleatorio);

      this.myChart1 = new Chart(ctx, {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: 'Total de Ventas del Año ' + año,
            data: [],
            backgroundColor: coloresAleatorios,
            borderColor: coloresAleatorios.map(color => color.replace('0.2', '1')),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });

    }
  }

  ActualizarGrafico1 = async (año: any) => {
    try {
      const response = await fetch('https://apitechplayzonevercel.vercel.app//api/totalmes/' + año);
      const data = await response.json();

      if (this.myChart1) {
        this.myChart1.data.labels = data.mes;  // X
        this.myChart1.data.datasets[0].data = data.total; // Y
        this.myChart1.update();
      }
    } catch (error) {
      console.error(error);
    }
  };

  Estadisticas2(topnum: any) {
    Chart.register(...registerables);

    const ctx = document.getElementById('myChart2') as HTMLCanvasElement | null;

    if (ctx) {

      function generarColorAleatorio() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = 0.5; // Transparencia del color
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      }

      const coloresAleatorios = Array.from({ length: 12 }, generarColorAleatorio);

      this.myChart2 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'Top ' + topnum + ' Productos Más Vendidos ',
            data: [],
            backgroundColor: coloresAleatorios,
            borderColor: coloresAleatorios.map(color => color.replace('0.2', '1')),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });

    }
  }

  ActualizarGrafico2 = async (topnum: any) => {
    try {
      const response = await fetch('https://apitechplayzonevercel.vercel.app//api/topproductos/' + topnum);
      const data = await response.json();

      if (this.myChart2) {
        this.myChart2.data.labels = data.producto;  // X
        this.myChart2.data.datasets[0].data = data.cantidad; // Y
        this.myChart2.update();
      }
    } catch (error) {
      console.error(error);
    }
  };

  Estadisticas3(año: any, mes:any) {
    Chart.register(...registerables);

    const ctx = document.getElementById('myChart3') as HTMLCanvasElement | null;

    if (ctx) {

      function generarColorAleatorio() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = 0.7; // Transparencia del color
        return `rgba(${r}, ${g}, ${b}, ${a})`;
      }

      const coloresAleatorios = Array.from({ length: 12 }, generarColorAleatorio);

      this.myChart3 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: [],
          datasets: [{
            label: 'Total de Ventas en el ' + mes + '/' + año,
            data: [],
            backgroundColor: coloresAleatorios,
            borderColor: coloresAleatorios.map(color => color.replace('0.2', '1')),
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });

    }
  }

  ActualizarGrafico3 = async (an: any, me:any) => {
    try {
      const anio = an;
      const mes = me;
      const response = await fetch('https://apitechplayzonevercel.vercel.app//api/totaldelmes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' // Especifica que el cuerpo es JSON
        },
        body: JSON.stringify({ anio, mes }) // Convierte el objeto a JSON
      });
      const data = await response.json();

      if (this.myChart3) {
        this.myChart3.data.labels = data.dia;  // X
        this.myChart3.data.datasets[0].data = data.total; // Y
        this.myChart3.update();
      }
    } catch (error) {
      console.error(error);
    }
  };
}

