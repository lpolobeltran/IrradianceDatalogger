import { CommonModule } from '@angular/common';
import { GoogleSheetsService } from './../../services/google-sheets.service';
import { Component, OnInit } from '@angular/core'; // Se importa OnInit para poder usarlo
import { BarraCircularComponent } from '../../components/barra-circular/barra-circular.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BarraCircularComponent], // Necesario para
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public data: any[] = []; // Variable para almacenar los datos que vienen del servicio

  constructor(private googleSheetsService: GoogleSheetsService) {}

  ngOnInit(): void {
    this.googleSheetsService.getDataWithPolling(5000).subscribe({
      next: (data) => {
        this.data = data; // Asigna los datos recibidos a "data"
      },
      error: (err) => console.error('Error al obtener datos:', err),
    });
  }
}
