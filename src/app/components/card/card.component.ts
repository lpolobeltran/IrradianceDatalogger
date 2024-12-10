import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit  } from '@angular/core';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnChanges {

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




  dataKey: string = '';
  dashOffset: string = '0'; // Inicializamos en 0 para la animación

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.dataKey = `key-${Date.now()}`; // Aseguramos una clave única para reiniciar la animación
      this.updateDashOffset();
    }
  }


  // Función para calcular el desplazamiento de la barra de progreso
  updateDashOffset() {
    let value = 0;

    if (this.data.temperatura !== undefined) {
      value = this.data.temperatura;
    } else if (this.data.humedad !== undefined) {
      value = this.data.humedad;
    } else if (this.data.temperaturaIn !== undefined) {
      value = this.data.temperaturaIn;
    } else if (this.data.corriente !== undefined) {
      value = this.data.corriente;
    } else if (this.data.voltaje !== undefined) {
      value = this.data.voltaje;
    } else if (this.data.irradiacionPatron !== undefined) {
      value = this.data.irradiacionPatron;
    } else if (this.data.irradiacionProto !== undefined) {
      value = this.data.irradiacionProto;
    } else if (this.data.irradiacionPanel !== undefined) {
      value = this.data.irradiacionPanel;
    }

    // Calcula el porcentaje basado en el valor máximo
    const maxValue = this.getMaxValue();
    const percentage = Math.min((value / maxValue) * 100, 100);

    // Calcula el offset basado en el porcentaje
    const circumference = 2 * Math.PI * 40; // Circunferencia del círculo (radio=40)
    this.dashOffset = `${circumference * (1 - percentage / 100)}px`;

    console.log(this.dashOffset);

  }

  getMaxValue(): number {
    if (this.data.temperatura !== undefined) return 100;
    if (this.data.humedad !== undefined) return 100;
    if (this.data.temperaturaIn !== undefined) return 100;
    if (this.data.corriente !== undefined) return 30;
    if (this.data.voltaje !== undefined) return 25;
    if (this.data.irradiacionPatron !== undefined) return 1500;
    if (this.data.irradiacionProto !== undefined) return 1500;
    if (this.data.irradiacionPanel !== undefined) return 1500;
    return 100; // Valor por defecto
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

  ngAfterViewInit(): void {
    const circumference = 2 * Math.PI * 40; // Circunferencia del círculo (radio=40)
    this.dashOffset = `${circumference}px`; // Empieza en el máximo valor (100%)

    // Luego, actualiza al valor real con un pequeño retardo para permitir la animación
    setTimeout(() => {
      this.updateDashOffset();
    }, 300);
  }

}
