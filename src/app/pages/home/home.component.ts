import { CommonModule } from '@angular/common';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { Component, OnInit } from '@angular/core';
import { CardComponent } from "../../components/card/card.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent], // Necesario para
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  public temperatura: number = 0; // Último valor de la temperatura
  public humedad: number = 0; // Último valor de la temperatura
  public temperaturaIn: number = 0; // Último valor de la temperatura
  public corriente: number = 0; // Último valor de la temperatura
  public voltaje: number = 0; // Último valor de la temperatura
  public irradiacionPatron: number = 0; // Último valor de la temperatura
  public irradiacionProto: number = 0; // Último valor de la temperatura
  public irradiacionPanel: number = 0; // Último valor de la temperatura

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

}
