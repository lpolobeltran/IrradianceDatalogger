import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AmbientalComponent } from './pages/ambiental/ambiental.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AmbientalComponent, FormsModule, CommonModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'borrador';
}
