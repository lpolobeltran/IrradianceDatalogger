import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-circular',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-circular.component.html',
  styleUrl: './barra-circular.component.scss'
})
export class BarraCircularComponent implements OnInit {
  degree: number = 0;  // Valor inicial
  targetDegree: number = 100;  // Valor objetivo
  color: string = '#fee800';  // Color del gradiente
  circleStyle: { [key: string]: string } = {};  // Para el estilo dinámico

  ngOnInit() {
    this.animateCircle();
  }

  animateCircle() {
    let degree = 0;
    const interval = setInterval(() => {
      degree += 1;
      if (degree > this.targetDegree) {
        clearInterval(interval);
      }
      this.degree = degree;
      this.circleStyle['background'] = `conic-gradient(${this.color} ${degree}%, #222 0%)`;
    }, 50);
  }
}
