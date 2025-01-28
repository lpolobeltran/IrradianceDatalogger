import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Chart, LinearScale, LineElement, PointElement, Title, Tooltip, Legend, LineController, CategoryScale } from 'chart.js';

// Registra los controladores, escalas y otros elementos necesarios
Chart.register(
  LinearScale,    // Escala lineal para el eje Y
  LineElement,    // Elemento de línea para representar las líneas
  PointElement,   // Elemento de punto para representar los puntos de los datos
  LineController, // Controlador de líneas (necesario para gráficos de línea)
  Title,          // Título del gráfico
  Tooltip,        // Herramienta de información sobre el gráfico
  Legend,         // Leyenda para las series
  CategoryScale   // Escala de categorías para el eje X
);

@Component({
  standalone: true,
  selector: 'app-grafic',
  imports: [CommonModule],
  templateUrl: './grafic.component.html',
  styleUrl: './grafic.component.scss'
})
export class GraficComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Obtén el contexto del canvas
    const ctx = (document.getElementById('grafic') as HTMLCanvasElement).getContext('2d');
    let labels = ["13:38", "13:37", "13:36", "13:36", "13:35",
      "13:35", "13:34", "13:34", "13:33", "13:33",
      "13:32", "13:32", "13:31"];

let datosRika = [627.273, 628.636, 612.273, 531.818, 424.091,
         432.273, 384.545, 436.364, 466.364, 617.727,
         744.545, 743.182, 868.636];

let datosProt = [667.342, 637.02, 625.848, 565.204, 491.792,
         466.257, 443.915, 458.278, 502.963, 619.465,
         702.452, 720.007, 802.994];

let datosPanel = [429.65, 429.33, 403.99, 336.94, 227.95,
          232.85, 187.51, 237.79, 267.59, 414.32,
          545.91, 542.47, 673.61];


    // Verifica que el contexto exista antes de continuar
    if (ctx) {

      new Chart(ctx, {
        type: 'line',  // Establece el tipo de gráfico como 'line' (gráfico de líneas)
        data: {
          labels: labels,  // Etiquetas del eje X
          datasets: [
            {
              label: 'Irradiancia Patrón',
              data: datosRika,  // Datos de la primera serie
              borderColor: 'rgba(255, 0, 0, 1)', // Rojo sólido
              backgroundColor: 'rgba(255, 0, 0, 0.2)', // Rojo con transparencia
              fill: true,              // Rellenar el área bajo la línea
              tension: 0.5,
            },
            {
              label: 'Irradiancia Prototipo',
              data: datosProt,  // Datos de la segunda serie
              borderColor: 'rgba(0, 0, 255, 1)', // Azul sólido
              backgroundColor: 'rgba(0, 0, 255, 0.2)', // Azul con transparencia
              fill: true,              // Rellenar el área bajo la línea
              tension: 0.5,

            },
            {
              label: 'Irradiancia Panel',
              data: datosPanel,  // Datos de la segunda serie
              borderColor: 'rgba(128, 0, 128, 1)', // Azul sólido
              backgroundColor: 'rgba(128, 0, 128, 0.2)', // Azul con transparencia
              fill: true,              // Rellenar el área bajo la línea
              tension: 0.5,

            },
          ],
        },
        options: {
          animation: {
            duration: 0  // Desactiva la animación completamente
          },
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              type: 'category',
              grid: {
                display: false
              },
            },
            y: {
              beginAtZero: true,
              grid: {
                display: false
              },
            },
          },
          elements: {
            line: {
              borderWidth: 2, // Grosor de la línea
              fill: true,
            },
            point: {
              radius: 0, // Tamaño de los puntos
            },
          },
        },

      });
    }
  }
}
