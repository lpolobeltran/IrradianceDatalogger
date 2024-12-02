import { CommonModule } from '@angular/common';
import { GoogleSheetsService } from '../../services/google-sheets.service';
import { Component, OnInit } from '@angular/core'; // Se importa OnInit para poder usarlo
import { MenuComponent } from '../../components/menu/menu.component';
import { CardComponent } from "../../components/card/card.component";


@Component({
  selector: 'app-ambiental',
  standalone: true,
  imports: [CommonModule, MenuComponent, CardComponent], // Necesario para
  templateUrl: './ambiental.component.html',
  styleUrl: './ambiental.component.scss'
})
export class AmbientalComponent implements OnInit {
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
