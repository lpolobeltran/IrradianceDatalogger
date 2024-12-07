import { CommonModule } from '@angular/common';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { Component, OnDestroy, OnInit } from '@angular/core'; // Se importa OnInit para poder usarlo
import { CardComponent } from "../../components/card/card.component";
import { Subject } from 'rxjs'; // Para manejar la destrucción del componente
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent], // Necesario para
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit, OnDestroy {
  public temperatura: number = 0; // Último valor de la temperatura
  private destroy$ = new Subject<void>(); // Ayuda a cancelar las suscripciones al destruir el componente

  // Inyeccion del servicio "GoogleSheetsService"
  constructor(private googleSheetsService: GoogleSheetsService) { } // Servicio de Google Sheets


  ngOnInit(): void {
    // Obtener datos con polling y gestionar suscripciones
    this.googleSheetsService.getLatestData()
      .pipe(takeUntil(this.destroy$)) // Cancela la suscripción al destruir el componente
      .subscribe({
        next: (data) => {
          if (data.length > 0) {
            const latestRow = data[data.length - 1];
            this.temperatura = latestRow[1]; // Ajusta el índice según tu hoja de cálculo
          }
        },
        error: (err) => console.error('Error al obtener datos:', err),
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); // Finaliza el `Subject` para evitar fugas de memoria
  }

}
