import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnChanges{

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
    unidad: string,
    svg:string,
    myColor:string
  }; // Escucha un objeto con múltiples valores


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      const value = this.data.temperatura || this.data.humedad || this.data.temperaturaIn || this.data.corriente || this.data.voltaje || this.data.irradiacionPatron || this.data.irradiacionProto || this.data.irradiacionPanel || 0;
      const maxValue = this.data.temperatura !== undefined || this.data.humedad !== undefined || this.data.temperaturaIn !== undefined
        ? 100
        : this.data.corriente !== undefined
        ? 30
        : this.data.voltaje !== undefined
        ? 25
        : 1500;

      this.updateDashOffset(value, maxValue);
    }
  }

  dashOffset: string = '';

  private updateDashOffset(value: number, maxValue: number): void {
    const percentage = Math.min((value / maxValue) * 100, 100);
    const circumference = 2 * Math.PI * 40;
    this.dashOffset = `${circumference * (1 - percentage / 100)}px`;
  }

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
    console.log(percentage);
    const circumference = 2 * Math.PI * 40; // Fórmula: 2 * π * radio
    const dashOffset = circumference * (1 - percentage / 100);
    return `${dashOffset}px`;

  }

  // Funcion para calcular el porcentaje correspondiente del valor de cada sensor:
  calcularPorcentaje(valorSensor: number | undefined, valorMaximo: number | undefined): number | undefined {
    let porcentaje = 0;
    // let titulo = this.data.titulo;
    porcentaje = (valorSensor! / valorMaximo!) * 100;

    return parseFloat(porcentaje.toFixed(2));
  }

}
