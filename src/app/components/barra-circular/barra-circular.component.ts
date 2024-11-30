import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-circular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-circular.component.html',
  styleUrls: ['./barra-circular.component.scss']
})
export class BarraCircularComponent implements OnInit {
  degree: number = 0;  // Valor inicial
  targetDegree: number = 15.5;  // Valor objetivo
  color: string = '#fee800';  // Color del gradiente
  circleStyle: { [key: string]: string } = {};  // Para el estilo dinámico
  numberStyle: { [key: string]: string } = {};  // Para el estilo dinámico del número

  ngOnInit() {
    this.animateCircle();
  }

  animateCircle() {
    let degree = 0;
    const interval = setInterval(() => {
      if (degree >= this.targetDegree) {  // Verificamos si ya alcanzó el objetivo
        degree = this.targetDegree;  // Aseguramos que no se pase de 100
        clearInterval(interval);
      } else {
        degree += 1;
      }

      this.degree = degree;  // Actualiza el valor de la animación
      this.circleStyle['background'] = `conic-gradient(${this.color} ${degree}%, #222 0%)`;

      // Actualiza el color del número dinámicamente
      this.numberStyle['color'] = this.color;  // Asigna el mismo color al número
    }, 50);
  }
}
