import { Injectable } from '@angular/core'; // Marca la clase como un servicio
import { HttpClient } from '@angular/common/http'; // Permite hacer solicitudes HTTP, si o si debe ponerse
import { Observable, BehaviorSubject, interval, switchMap } from 'rxjs'; // Ayuda a manejar datos que llegan de manera asíncrona
import { catchError, throwError } from 'rxjs'; // Asegúrate de importar estos operadores


@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})

export class GoogleSheetsService {
  private apiUrl = 'https://script.google.com/macros/s/AKfycbwZF4BczprSf9A2Chp9Gnub2-QtZcYfapDbrr6wG1v-1ZhZiWg0dFZUtUic5VTc-A2A/exec'; // Aquí debes poner el enlace de tu mini API
  // private temperatura: number = 0; // Almacena la última temperatura recibida
  private latestData = new BehaviorSubject<any>(this.getDataFromLocalStorage()); // Inicializa con datos de localStorage si existen

  constructor(private http: HttpClient) {
    this.startPolling(); // Inicia el polling al instanciar el servicio
  } // HttpClient es necesario para hacer las solicitudes HTTP

  // Recuperar datos de localStorage
  private getDataFromLocalStorage(): any {
    const storedData = localStorage.getItem('latestData');
    return storedData ? JSON.parse(storedData) : null;
  }

   // Guardar datos en localStorage
   private saveDataToLocalStorage(data: any): void {
    localStorage.setItem('latestData', JSON.stringify(data)); // Guarda los datos en localStorage
  }

  // Método que hace polling y emite datos a través del BehaviorSubject
  startPolling(intervalMs: number = 5000): void {
    interval(intervalMs)
      .pipe(switchMap(() => this.getData())) // Hace polling cada 'intervalMs' ms
      .subscribe({
        next: (data) => {
          this.saveDataToLocalStorage(data); // Guarda los nuevos datos en localStorage
          this.latestData.next(data); // Actualiza el BehaviorSubject con los nuevos datos
        },
        error: (err) => console.error('Error al obtener datos:', err),
      });
  }

  // Este método obtiene los datos más recientes almacenados
  getLatestData(): Observable<any[]> {
    return this.latestData.asObservable();
  }

  // Realiza una solicitud directa a la API
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Método para obtener el último dato (temperatura) del BehaviorSubject
  get latestTemperature(): Observable<any> {
    return this.latestData.asObservable(); // Devuelve un observable para que los componentes se suscriban
  }

  enviarIntervalo(intervalo: number): Observable<any> {
    const body = { intervalo };

    return this.http.post<any>(this.apiUrl, body).pipe(
      catchError((error) => {
        console.error('Error al enviar el intervalo:', error);
        return throwError(() => new Error('Error en la solicitud de envío de intervalo'));
      })
    );
  }

}
