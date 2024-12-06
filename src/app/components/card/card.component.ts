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
  // @Input() temperature: number = 0; // Valor predeterminado en caso de no recibir entrada
  @Input() data!: { titulo: string; stroke: string,  temperatura?: number, humedad?:number }; // Escucha un objeto con múltiples valores

  /* En TypeScript, todas las propiedades deben ser inicializadas antes de usarse. Si declaras una propiedad sin inicializarla,
  TypeScript asume que podría ser undefined, lo cual puede causar errores en tiempo de compilación. Angular asignará el valor más
  adelante, pero TypeScript no lo sabe y da un error. Si estás seguro de que Angular u otro mecanismo inicializará la propiedad
  correctamente, puedes usar ! para evitar el error de compilación */


  //  función para calcular el desplazamiento de progreso en función de la temperatura:
  calculateDashOffset(temperatura: number | undefined): string {

    const validTemperature = temperatura ?? 0;
    const maxTemperature = 100; // Cambia este valor según el rango máximo esperado
    const percentage = Math.min((validTemperature / maxTemperature) * 100, 100); // Asegura que no exceda el 100%

    const circumference = 2 * Math.PI * 40; // Fórmula: 2 * π * radio
    const dashOffset = circumference * (1 - percentage / 100);
    return `${dashOffset}px`;

  }

}
