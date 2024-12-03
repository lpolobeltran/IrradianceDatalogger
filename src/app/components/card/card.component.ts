import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() temperature: number = 0; // Valor predeterminado en caso de no recibir entrada

  //  función para calcular el desplazamiento de progreso en función de la temperatura:
  calculateDashOffset(temperature: number): string {
    const maxTemperature = 100; // Cambia este valor según el rango máximo esperado
    const percentage = Math.min((temperature / maxTemperature) * 100, 100); // Asegura que no exceda el 100%

    const circumference = 2 * Math.PI * 40; // Fórmula: 2 * π * radio
    const dashOffset = circumference * (1 - percentage / 100);
    return `${dashOffset}px`;
  }

}
