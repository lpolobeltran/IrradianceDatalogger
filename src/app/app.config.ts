// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientModule } from '@angular/common/http';
// import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';
// import { PrimeNGConfig } from 'primeng/api';



// import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';

// export const appConfig: ApplicationConfig = {
//   providers: [

//     provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),


//     importProvidersFrom(
//       HttpClientModule,
//     )

//   ],


// };

import { HttpClientModule } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Asegúrate de importar BrowserAnimationsModule
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),

    // Importa BrowserAnimationsModule aquí, dentro de importProvidersFrom
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule // Esta es la manera correcta de agregarlo
    )
  ],
};


