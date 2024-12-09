import { CommonModule } from '@angular/common';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { Component, OnInit } from '@angular/core';
import { GraficComponent } from '../../components/grafic/grafic.component';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-comparacion-irradiancia',
  standalone: true,
  imports: [GraficComponent, CardComponent, CommonModule],
  templateUrl: './comparacion-irradiancia.component.html',
  styleUrl: './comparacion-irradiancia.component.scss'
})
export class ComparacionIrradianciaComponent  {

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
          const latestRow = data[data.length-1]; // Ubicarse en la última fila de los datos que se reciben en el array data
          this.irradiacionPatron = latestRow[6]; // Asumiendo que la temperatura está en la columna 1
          this.irradiacionProto = latestRow[7]; // Asumiendo que la temperatura está en la columna 1
          this.irradiacionPanel = latestRow[8]; // Asumiendo que la temperatura está en la columna 1
        }
      },
      error: (err) => console.error('Error al obtener datos:', err),
    });
  }

}
