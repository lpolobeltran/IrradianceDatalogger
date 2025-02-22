import { Component } from '@angular/core';
import { GoogleSheetsService2 } from '../services/servi-sheet.service';

@Component({
  selector: 'app-prueba',
  standalone: true,
  imports: [],
  templateUrl: './prueba.component.html',
  styleUrl: './prueba.component.scss'
})
export class PruebaComponent {
  constructor(private sheetsService: GoogleSheetsService2) {}

  enviar() {
    this.sheetsService.enviarDato("Ejemplo de dato").subscribe(res => {
      console.log("Respuesta:", res);
    });
  }
}
