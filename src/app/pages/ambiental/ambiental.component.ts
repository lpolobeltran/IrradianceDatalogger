import { CommonModule } from '@angular/common';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { Component, OnInit } from '@angular/core'; // Se importa OnInit para poder usarlo
import { CardComponent } from "../../components/card/card.component";


@Component({
  selector: 'app-ambiental',
  standalone: true,
  imports: [CommonModule, CardComponent], // Necesario para
  templateUrl: './ambiental.component.html',
  styleUrl: './ambiental.component.scss'
})
export class AmbientalComponent implements OnInit {
  public temperature: number = 0; // Último valor de la temperatura

  constructor(private googleSheetsService: GoogleSheetsService) {}

  ngOnInit(): void {
    this.googleSheetsService.getDataWithPolling(5000).subscribe({
      next: (data) => {
        const latestRow = data[data.length - 1]; // Asume que la última fila tiene el dato más reciente
        this.temperature = latestRow[1]; // Cambia [1] por el índice de la columna que contiene la temperatura
      },
      error: (err) => console.error('Error al obtener datos:', err),
    });
  }
}
