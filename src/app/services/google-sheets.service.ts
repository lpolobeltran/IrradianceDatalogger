import { Injectable } from '@angular/core'; // Marca la clase como un servicio
import { HttpClient } from '@angular/common/http'; // Permite hacer solicitudes HTTP, si o si debe ponerse
import { Observable, BehaviorSubject, interval, switchMap } from 'rxjs'; // Ayuda a manejar datos que llegan de manera asíncrona


@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})

export class GoogleSheetsService {
  private apiUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=Y7GxryvqFMp5ANsFkj_18sRyGhvWJOhV8CDKOsCqPTs_JUI_OXvFRGufpIXgxZopPTt9pvpTcwJNLkq_JFRVprdCMciSj1Msm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGv69DWB_nWJMahCEMl0qd1PUO1fpuSZjRa0JCkL-MKQNMYgbpU8W3I_jD_r1dVU94UX_oPhl7_TI1dc2GGX5cR9eXB04gu2Lw&lib=M-yaEGDJ7e3igvdJIeyNe_Thu1KL008Ao'; // Aquí debes poner el enlace de tu mini API
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

}
