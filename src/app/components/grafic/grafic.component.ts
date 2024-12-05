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
    let labels = ["13:38:10.86", "13:38:05.85", "13:38:00.85", "13:37:55.84", "13:37:50.84",
      "13:37:45.83", "13:37:40.83", "13:37:35.82", "13:37:30.81", "13:37:25.81",
      "13:37:20.81", "13:37:15.80", "13:37:10.80", "13:37:05.79", "13:37:00.79",
      "13:36:55.78", "13:36:50.78", "13:36:45.77", "13:36:40.77", "13:36:35.76",
      "13:36:30.76", "13:36:25.75", "13:36:20.75", "13:36:15.74", "13:36:10.74",
      "13:36:05.73", "13:36:00.73", "13:35:55.72", "13:35:50.72", "13:35:45.72",
      "13:35:40.71", "13:35:35.71", "13:35:30.70", "13:35:25.69", "13:35:20.69",
      "13:35:15.69", "13:35:10.68", "13:35:05.67", "13:35:00.67", "13:34:55.66",
      "13:34:50.66", "13:34:45.66", "13:34:40.65", "13:34:35.65", "13:34:30.64",
      "13:34:25.64", "13:34:20.63", "13:34:15.63", "13:34:10.62", "13:34:05.62",
      "13:34:00.61", "13:33:55.61", "13:33:50.60", "13:33:45.60", "13:33:40.60",
      "13:33:35.59", "13:33:30.58", "13:33:25.58", "13:33:20.58", "13:33:15.57",
      "13:33:10.56", "13:33:05.56", "13:33:00.56", "13:32:55.55", "13:32:50.54",
      "13:32:45.54", "13:32:40.53", "13:32:35.53", "13:32:30.53", "13:32:25.52",
      "13:32:20.52", "13:32:15.51", "13:32:10.50", "13:32:05.50", "13:32:00.49",
      "13:31:55.49", "13:31:50.49", "13:31:45.48", "13:31:40.47", "13:31:35.47",
      "13:31:30.47", "13:31:25.46", "13:31:20.46", "13:31:15.45", "13:31:10.45",
      "13:31:05.44", "13:31:00.44", "13:30:55.43", "13:30:50.43", "13:30:45.42",
      "13:30:40.42", "13:30:35.41", "13:30:30.41", "13:30:25.41", "13:30:20.40",
      "13:30:15.42"];
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

    // Verifica que el contexto exista antes de continuar
    if (ctx) {
      new Chart(ctx, {
        type: 'line',  // Establece el tipo de gráfico como 'line' (gráfico de líneas)
        data: {
          labels: labels,  // Etiquetas del eje X
          datasets: [
            {
              label: 'Irradiance Rika',
              data: datosRika,  // Datos de la primera serie
              borderColor: 'red',      // Color de la línea
              backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de fondo de la línea (transparente)
              fill: true,              // Rellenar el área bajo la línea
            },
            {
              label: 'Irradiance Prototipo',
              data: datosProt,  // Datos de la segunda serie
              borderColor: 'blue',     // Color de la línea
              backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color de fondo de la línea (transparente)
              fill: true,              // Rellenar el área bajo la línea
            },
          ],
        },
        options: {
          responsive: true,  // Hacer el gráfico responsive
          scales: {
            x: {
              type: 'category', // Definir que el eje X sea de tipo 'categoría'
            },
            y: {
              beginAtZero: true, // Asegurar que el eje Y comience en 0
              type: 'linear',    // Definir que el eje Y sea de tipo 'lineal'
            },
          },
        },
      });
    }
  }
}
