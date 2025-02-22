import { CommonModule } from '@angular/common';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";
import { GraficoLinealComponent } from '../../components/grafico-lineal/grafico-lineal.component';

@Component({
  selector: 'app-historial-ambientales',
  standalone: true,
  imports: [CardComponent, GraficoLinealComponent],
  templateUrl: './historial-ambientales.component.html',
  styleUrl: './historial-ambientales.component.scss'
})
export class HistorialAmbientalesComponent implements OnInit {

  public temperatura: number = 0; // Último valor de la temperatura
  public humedad: number = 0; // Último valor de la temperatura
  public temperaturaIn: number = 0; // Último valor de la temperatura
  public irradianciaProto: number = 0; // Último valor de la temperatura

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
          this.irradianciaProto = latestRow[7]; // Asumiendo que la temperatura está en la columna 1
        }

      },
      error: (err) => console.error('Error al obtener datos:', err),
    });
  }

}
