import feather from 'feather-icons';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intervalos',
  standalone: true,
  imports: [],
  templateUrl: './intervalos.component.html',
  styleUrl: './intervalos.component.scss'
})
export class IntervalosComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    // Reemplazar íconos con feather-icons
    feather.replace();

    // Inicializar los botones con listeners y estados aleatorios
    this.initializeButtons();
  }

  buttonActive(button: HTMLElement): void {
    const buttonState = button.classList.contains('c-button--active');
    const buttonType = button.dataset['button'] || '';

    if (buttonState) {
      button.classList.remove(`u-text--${buttonType}`);
    } else {
      button.classList.add(`u-text--${buttonType}`);
    }
    button.classList.toggle('c-button--active');
  }

  initializeButtons(): void {
    const buttons = document.querySelectorAll('.c-button');
    buttons.forEach((button) => {
      // Añadir listener de click
      button.addEventListener('click', () => {
        this.buttonActive(button as HTMLElement);
      });
    });
  }

}
