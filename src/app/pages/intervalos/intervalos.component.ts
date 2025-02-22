import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-intervalos',
  standalone: true,
  templateUrl: './intervalos.component.html',
  styleUrls: ['./intervalos.component.scss']
})
export class IntervalosComponent implements AfterViewInit {

  ngAfterViewInit() {
    const buttons = document.querySelectorAll<HTMLButtonElement>(".intervalos__buttom button");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");
      });
    });
  }
}
