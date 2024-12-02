import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

 bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));


// import { bootstrapApplication } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Importa las animaciones
// import { DropdownComponent } from '../src/app/components/dropdown/dropdown.component';  // Asegúrate de que el componente standalone esté bien importado

// bootstrapApplication(DropdownComponent, {
//   providers: [
//     { provide: BrowserAnimationsModule, useClass: BrowserAnimationsModule },  // Añade el módulo de animaciones aquí
//   ]
// }).catch(err => console.error(err));
