import { Injectable } from '@angular/core'; // Marca la clase como un servicio
import { HttpClient } from '@angular/common/http'; // Permite hacer solicitudes HTTP, si o si debe ponerse
import { Observable, BehaviorSubject, interval, switchMap } from 'rxjs'; // Ayuda a manejar datos que llegan de manera asíncrona


@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})

export class GoogleSheetsService {
  private apiUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=Y7GxryvqFMp5ANsFkj_18sRyGhvWJOhV8CDKOsCqPTs_JUI_OXvFRGufpIXgxZopPTt9pvpTcwJNLkq_JFRVprdCMciSj1Msm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGv69DWB_nWJMahCEMl0qd1PUO1fpuSZjRa0JCkL-MKQNMYgbpU8W3I_jD_r1dVU94UX_oPhl7_TI1dc2GGX5cR9eXB04gu2Lw&lib=M-yaEGDJ7e3igvdJIeyNe_Thu1KL008Ao'; // Aquí debes poner el enlace de tu mini API
  private latestData = new BehaviorSubject<any[]>([]); // Almacena los datos más recientes

  constructor(private http: HttpClient) {
    this.startPolling(); // Inicia el polling al instanciar el servicio
  } // HttpClient es necesario para hacer las solicitudes HTTP

  private startPolling(intervalMs: number = 5000): void {
    interval(intervalMs)
      .pipe(switchMap(() => this.getData()))
      .subscribe({
        next: (data) => this.latestData.next(data), // Actualiza el estado interno
        error: (err) => console.error('Error en el polling:', err),
      });
  }

  // Este método obtiene los datos más recientes almacenados
  getLatestData(): Observable<any[]> {
    return this.latestData.asObservable();
  }

  // Realiza una solicitud directa a la API
  private getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
