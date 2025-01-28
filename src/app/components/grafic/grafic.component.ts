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
    let labels = ["13:38:10", "13:38:05", "13:38:00", "13:37:55", "13:37:50",
      "13:37:45", "13:37:40", "13:37:35", "13:37:30", "13:37:25",
      "13:37:20", "13:37:15", "13:37:10", "13:37:05", "13:37:00",
      "13:36:55", "13:36:50", "13:36:45", "13:36:40", "13:36:35",
      "13:36:30", "13:36:25", "13:36:20", "13:36:15", "13:36:10",
      "13:36:05", "13:36:00", "13:35:55", "13:35:50", "13:35:45",
      "13:35:40", "13:35:35", "13:35:30", "13:35:25", "13:35:20",
      "13:35:15", "13:35:10", "13:35:05", "13:35:00", "13:34:55",
      "13:34:50", "13:34:45", "13:34:40", "13:34:35", "13:34:30",
      "13:34:25", "13:34:20", "13:34:15", "13:34:10", "13:34:05",
      "13:34:00", "13:33:55", "13:33:50", "13:33:45", "13:33:40",
      "13:33:35", "13:33:30", "13:33:25", "13:33:20", "13:33:15",
      "13:33:10", "13:33:05", "13:33:00", "13:32:55", "13:32:50",
      "13:32:45", "13:32:40", "13:32:35", "13:32:30", "13:32:25",
      "13:32:20", "13:32:15", "13:32:10", "13:32:05", "13:32:00",
      "13:31:55", "13:31:50", "13:31:45", "13:31:40", "13:31:35",
      "13:31:30", "13:31:25", "13:31:20", "13:31:15", "13:31:10",
      "13:31:05", "13:31:00", "13:30:55", "13:30:50", "13:30:45",
      "13:30:40", "13:30:35", "13:30:30", "13:30:25", "13:30:20",
      "13:30:15"
    ];
    labels.reverse()

    let datosRika = [627.273, 608.182, 621.818, 621.818, 628.636, 589.091, 590.455, 625.909,
      619.091, 612.273, 600.0, 563.182, 582.273, 565.909, 531.818, 512.727,
      507.273, 519.545, 469.091, 489.545, 432.273, 424.091, 473.182, 471.818,
      455.455, 466.364, 440.455, 441.818, 470.455, 459.545, 418.636, 432.273,
      433.636, 421.364, 385.909, 384.545, 402.273, 379.091, 415.909, 390.0,
      432.273, 440.455, 436.364, 420.0, 410.455, 448.636, 451.364, 424.091,
      398.182, 430.909, 466.364, 478.636, 450.0, 466.364, 492.273, 480.0,
      553.636, 525.0, 544.091, 557.727, 619.091, 617.727, 619.091, 657.273,
      662.727, 666.818, 666.818, 709.091, 724.091, 744.545, 741.818, 744.545,
      774.545, 774.545, 755.455, 735.0, 733.636, 743.182, 729.545, 707.727,
      722.727, 748.636, 760.909, 814.091, 826.364, 807.273, 835.909, 818.182,
      868.636, 886.364, 924.545, 935.455, 905.455, 947.727, 927.273, 946.364]
    datosRika.reverse();

    let datosProt = [667.342, 646.595, 637.02, 633.828, 637.02, 640.211, 643.403, 637.02,
      629.04, 625.848, 613.081, 603.505, 590.738, 576.375, 565.204, 549.245,
      546.053, 534.881, 523.71, 509.347, 498.175, 491.792, 488.6, 491.792,
      494.984, 496.58, 496.58, 494.984, 490.196, 477.429, 466.257, 458.278,
      450.298, 447.106, 443.915, 442.319, 442.319, 440.723, 439.127, 445.51,
      453.49, 458.278, 463.065, 467.853, 469.449, 469.449, 467.853, 471.045,
      466.257, 485.408, 494.984, 498.175, 496.58, 502.963, 510.943, 523.71,
      541.265, 555.628, 563.608, 582.759, 601.91, 619.465, 629.04, 635.424,
      644.999, 651.383, 664.15, 675.321, 689.685, 702.452, 720.007, 726.391,
      729.582, 724.795, 723.199, 720.007, 716.815, 705.644, 696.068, 694.472,
      708.836, 727.987, 740.754, 758.309, 767.884, 775.864, 771.076, 777.46,
      802.994, 826.933, 841.296, 841.296, 842.892, 855.659, 868.427, 876.406]
    datosProt.reverse();

    let datosPanel = [429.65, 414.34, 419.94, 420.77, 429.33, 391.86, 390.15, 423.88,
      421.73, 411.02, 403.99, 360.80, 378.87, 369.42, 336.94, 311.58,
      310.35, 321.69, 265.94, 288.85, 232.81, 227.95, 277.72, 276.09,
      251.68, 268.51, 238.27, 238.37, 267.89, 257.85, 221.33, 232.85,
      229.97, 217.89, 192.06, 187.51, 200.69, 181.41, 213.64, 195.94,
      227.12, 240.98, 237.79, 222.81, 206.74, 244.94, 250.35, 229.19,
      200.85, 233.76, 263.91, 276.69, 248.79, 267.59, 288.87, 279.92,
      350.73, 326.18, 347.73, 354.93, 416.76, 414.32, 416.67, 452.56,
      462.94, 466.27, 466.23, 509.56, 524.31, 547.01, 544.04, 545.91,
      577.67, 570.72, 551.64, 532.32, 529.14, 542.47, 533.26, 508.77,
      526.43, 552.71, 556.12, 610.71, 630.49, 604.37, 633.47, 613.42,
      673.61, 683.99, 728.17, 737.12, 709.09, 745.88, 725.22, 750.65

    ]
    datosPanel.reverse();

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
