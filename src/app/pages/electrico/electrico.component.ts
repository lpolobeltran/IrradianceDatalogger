import { CommonModule } from '@angular/common';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: 'app-electrico',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './electrico.component.html',
  styleUrl: './electrico.component.scss'
})
export class ElectricoComponent implements OnInit {

  public corriente: number = 0; // Último valor de la temperatura
  public voltaje: number = 0; // Último valor de la temperatura
  public potencia: number = 0; // Último valor de la temperatura
  public irradianciaPanel: number = 0; // Último valor de la temperatura

  // Inyeccion del servicio "GoogleSheetsService"
  constructor(private googleSheetsService: GoogleSheetsService) { } // Servicio de Google Sheets


  ngOnInit(): void {
    // Nos suscribimos al observable que emite los datos actualizados
    this.googleSheetsService.latestTemperature.subscribe({
      next: (data) => {

        if (data && data.length) {
          const latestRow = data[data.length - 1];
          this.corriente = latestRow[4]; // Asumiendo que la temperatura está en la columna 1
          this.voltaje = latestRow[5]; // Asumiendo que la temperatura está en la columna 1
          this.irradianciaPanel = latestRow[8]; // Asumiendo que la temperatura está en la columna 1
          this.potencia = latestRow[9]; // Asumiendo que la temperatura está en la columna 1
        }

      },
      error: (err) => console.error('Error al obtener datos:', err),
    });
  }

}
