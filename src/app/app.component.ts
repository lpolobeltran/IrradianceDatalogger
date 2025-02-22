import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GraficComponent } from './components/grafic/grafic.component';
import { CardComponent } from './components/card/card.component';
import { GoogleSheetsService } from '../../src/app/services/google-sheets.service';
import { Component, OnInit } from '@angular/core';
import { PruebaComponent } from './prueba/prueba.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    GraficComponent,
    CardComponent,
    PruebaComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{

  public temperatura: number = 0; // Último valor de la temperatura
  public humedad: number = 0; // Último valor de la temperatura
  public temperaturaIn: number = 0; // Último valor de la temperatura
  public corriente: number = 0; // Último valor de la temperatura
  public voltaje: number = 0; // Último valor de la temperatura
  public irradiacionPatron: number = 0; // Último valor de la temperatura
  public irradiacionProto: number = 0; // Último valor de la temperatura
  public irradiacionPanel: number = 0; // Último valor de la temperatura
  intervalo: number = 10; // Valor inicial en minutos

  // Inyeccion del servicio "GoogleSheetsService"
  constructor(private googleSheetsService: GoogleSheetsService) { } // Servicio de Google Sheets

  ngOnInit(): void {
    // Nos suscribimos al observable que emite los datos actualizados
    this.googleSheetsService.latestTemperature.subscribe({
      next: (data) => {

        if (data && data.length) {
          const latestRow = data[data.length - 1];
          this.temperatura = latestRow[1]; // Asumiendo que la temperatura está en la columna 1
          this.humedad = latestRow[2]; // Asumiendo que la temperatura está en la columna 1
          this.temperaturaIn = latestRow[3]; // Asumiendo que la temperatura está en la columna 1
          this.corriente = latestRow[4]; // Asumiendo que la temperatura está en la columna 1
          this.voltaje = latestRow[5]; // Asumiendo que la temperatura está en la columna 1
          this.irradiacionPatron = latestRow[6]; // Asumiendo que la temperatura está en la columna 1
          this.irradiacionProto = latestRow[7]; // Asumiendo que la temperatura está en la columna 1
          this.irradiacionPanel = latestRow[8]; // Asumiendo que la temperatura está en la columna 1
        }

      },
      error: (err) => console.error('Error al obtener datos:', err),
    });
  }

  // Funciones para aumentar y disminuir el intervalo

  aumentarIntervalo() {
    this.intervalo += 10;
    this.googleSheetsService.enviarIntervalo(this.intervalo).subscribe({
      next: () => console.log('Intervalo enviado correctamente'),
      error: (err) => console.error('Error al enviar el intervalo:', err)
    });
  }

  disminuirIntervalo() {
    if (this.intervalo > 10) { // Límite mínimo
      this.intervalo -= 10;
      this.googleSheetsService.enviarIntervalo(this.intervalo).subscribe({
        next: () => console.log('Intervalo enviado correctamente'),
        error: (err) => console.error('Error al enviar el intervalo:', err)
      });
    }
  }

}
