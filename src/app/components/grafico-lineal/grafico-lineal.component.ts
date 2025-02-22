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
  selector: 'app-grafico-lineal',
  standalone: true,
  imports: [],
  templateUrl: './grafico-lineal.component.html',
  styleUrl: './grafico-lineal.component.scss'
})
export class GraficoLinealComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Obtén el contexto del canvas
    const ctx = (document.getElementById('grafic') as HTMLCanvasElement).getContext('2d');
    let labels = ["04:40:14", "04:45:14", "04:50:14", "04:55:14", "05:00:14", "05:05:14", "05:10:14", "05:15:14", "05:20:14", "05:25:14", "05:30:14", "05:35:14", "05:40:14", "05:45:14", "05:50:14"];

    let datosPanel = [25.25, 24.93, 25.32, 25.76, 24.88, 24.88, 25.79, 25.38, 24.77, 25.27, 24.77, 24.77, 25.12, 24.04, 24.14]

    // Verifica que el contexto exista antes de continuar
    if (ctx) {

      new Chart(ctx, {
        type: 'line',  // Establece el tipo de gráfico como 'line' (gráfico de líneas)
        data: {
          labels: labels,  // Etiquetas del eje X
          datasets: [

            {
              label: 'Temperatura',
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
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              type: 'category',
              ticks: {
                display: false  // Desactiva los labels del eje X
              },
              grid: {
                display: false  // Desactiva la cuadrícula del eje X
              }
            },

            y: {
              beginAtZero: true,
              ticks: {
                display: false  // Desactiva los labels del eje X
              },
              grid: {
                display: false  // Desactiva la cuadrícula del eje X
              }
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
