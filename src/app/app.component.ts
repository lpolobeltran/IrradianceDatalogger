import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ComparacionIrradianciaComponent } from "./pages/comparacion-irradiancia/comparacion-irradiancia.component";
import { HistorialAmbientalesComponent } from './pages/historial-ambientales/historial-ambientales.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, FormsModule, CommonModule, ComparacionIrradianciaComponent, HistorialAmbientalesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  activeComponent: string = 'home'; // Valor inicial

  showComponent(component: string) {
    this.activeComponent = component;
  }
}
