import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleSheetsService } from '../../services/google-sheets.service'; // Asegúrate de que la ruta sea correcta
import { Subscription } from 'rxjs'; // Necesario para manejar la suscripción al observable

@Component({
  selector: 'app-barra-circular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-circular.component.html',
  styleUrls: ['./barra-circular.component.scss']
})
export class BarraCircularComponent implements OnInit, OnDestroy {
  degree: number = 0;  // Valor inicial
  targetDegree: number = 0;  // Valor objetivo, que ahora provendrá de los datos de Sheets
  color: string = '#fee800';  // Color del gradiente
  circleStyle: { [key: string]: string } = {};  // Para el estilo dinámico
  numberStyle: { [key: string]: string } = {};  // Para el estilo dinámico del número
  private subscription: Subscription = new Subscription();  // Suscripción para el polling

  constructor(private googleSheetsService: GoogleSheetsService) {}

  ngOnInit() {
    this.fetchTemperatureData();  // Obtener el valor de la temperatura al iniciar
    this.startPolling();  // Comienza el polling para obtener datos de forma periódica
  }

  ngOnDestroy() {
    // Asegúrate de limpiar la suscripción cuando el componente se destruya
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // Método para obtener los datos y extraer la temperatura
  fetchTemperatureData() {
    this.googleSheetsService.getData().subscribe((data) => {
      console.log('Datos obtenidos de Google Sheets:', data);  // Agrega un log para ver los datos obtenidos
      const lastRow = data[data.length - 1];  // Obtener la última fila de datos

      const temperature = lastRow[1];  // Suponiendo que la temperatura está en la primera columna (ajustar si es necesario)

      this.targetDegree = parseFloat(temperature);  // Convierte a número si es necesario
      console.log('Temperatura convertida a número:', this.targetDegree);  // Verifica el valor después de convertirlo a número
      this.animateCircle();  // Iniciar la animación de la barra con el valor recibido
    });
  }

  // Inicia el polling para obtener datos cada 10 segundos (ajustable)
  startPolling() {
    this.subscription.add(
      this.googleSheetsService.getDataWithPolling(10000)  // Realiza la solicitud cada 10 segundos (10000 ms)
        .subscribe((data) => {
          this.fetchTemperatureData();  // Llama a `fetchTemperatureData` cada vez que se obtienen nuevos datos
        })
    );
  }

  // Método de animación
  animateCircle() {
    let degree = 0;
    const interval = setInterval(() => {
      if (degree >= this.targetDegree) {  // Verificamos si ya alcanzó el objetivo
        degree = this.targetDegree;  // Aseguramos que no se pase del valor recibido
        clearInterval(interval);
      } else {
        degree += 1;
      }

      this.degree = degree;  // Actualiza el valor de la animación
      this.circleStyle['background'] = `conic-gradient(${this.color} ${degree}%, #222 0%)`;

      // Actualiza el color del número dinámicamente
      this.numberStyle['color'] = this.color;  // Asigna el mismo color al número
    }, 50);
  }
}
