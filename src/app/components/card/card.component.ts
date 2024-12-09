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

  @Input() data!: {
    titulo: string; stroke: string,
    temperatura?: number,
    humedad?:number,
    temperaturaIn?:number,
    corriente?:number,
    voltaje?:number,
    irradiacionPatron?:number,
    irradiacionProto?:number,
    irradiacionPanel?:number,
    svg:string,
    myColor:string
  }; // Escucha un objeto con múltiples valores

  /* En TypeScript, todas las propiedades deben ser inicializadas antes de usarse. Si declaras una propiedad sin inicializarla,
  TypeScript asume que podría ser undefined, lo cual puede causar errores en tiempo de compilación. Angular asignará el valor más
  adelante, pero TypeScript no lo sabe y da un error. Si estás seguro de que Angular u otro mecanismo inicializará la propiedad
  correctamente, puedes usar ! para evitar el error de compilación */

  //  Función para calcular el desplazamiento de progreso en función de la temperatura:
  calculateDashOffsetTemperatura(value: number | undefined): string {

    const validValue = value ?? 0;
    const maxValue = 100; // Cambia este valor según el rango máximo esperado
    const percentage = Math.min((validValue / maxValue) * 100, 100); // Asegura que no exceda el 100%

    const circumference = 2 * Math.PI * 40; // Fórmula: 2 * π * radio
    const dashOffset = circumference * (1 - percentage / 100);
    return `${dashOffset}px`;

  }


  //  Función para calcular el desplazamiento de progreso en función de la corriente:
  calculateDashOffsetCorriente(value: number | undefined): string {

    const validValue = value ?? 0;
    const maxValue = 30; // Cambia este valor según el rango máximo esperado
    const percentage = Math.min((validValue / maxValue) * 100, 100); // Asegura que no exceda el 100%

    const circumference = 2 * Math.PI * 40; // Fórmula: 2 * π * radio
    const dashOffset = circumference * (1 - percentage / 100);
    return `${dashOffset}px`;

  }

  //  Función para calcular el desplazamiento de progreso en función de la corriente:
  calculateDashOffsetVoltaje(value: number | undefined): string {

    const validValue = value ?? 0;
    const maxValue = 25; // Cambia este valor según el rango máximo esperado
    const percentage = Math.min((validValue / maxValue) * 100, 100); // Asegura que no exceda el 100%

    const circumference = 2 * Math.PI * 40; // Fórmula: 2 * π * radio
    const dashOffset = circumference * (1 - percentage / 100);
    return `${dashOffset}px`;

  }

  //  Función para calcular el desplazamiento de progreso en función de la corriente:
  calculateDashOffsetPatron(value: number | undefined): string {

    const validValue = value ?? 0;
    const maxValue = 1500; // Cambia este valor según el rango máximo esperado
    const percentage = Math.min((validValue / maxValue) * 100, 100); // Asegura que no exceda el 100%

    const circumference = 2 * Math.PI * 40; // Fórmula: 2 * π * radio
    const dashOffset = circumference * (1 - percentage / 100);
    return `${dashOffset}px`;

  }

}
