import { Injectable } from '@angular/core'; // Marca la clase como un servicio
import { HttpClient } from '@angular/common/http'; // Permite hacer solicitudes HTTP, si o si debe ponerse
import { Observable } from 'rxjs'; // Ayuda a manejar datos que llegan de manera asíncrona
import { interval, switchMap } from 'rxjs'; // Herramientas para manejar flujos de datos reactivos y realizar polling.


@Injectable({
  providedIn: 'root', // Hace que este servicio esté disponible en toda la aplicación
})
export class GoogleSheetsService {
  private apiUrl = 'https://script.googleusercontent.com/macros/echo?user_content_key=Y7GxryvqFMp5ANsFkj_18sRyGhvWJOhV8CDKOsCqPTs_JUI_OXvFRGufpIXgxZopPTt9pvpTcwJNLkq_JFRVprdCMciSj1Msm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnGv69DWB_nWJMahCEMl0qd1PUO1fpuSZjRa0JCkL-MKQNMYgbpU8W3I_jD_r1dVU94UX_oPhl7_TI1dc2GGX5cR9eXB04gu2Lw&lib=M-yaEGDJ7e3igvdJIeyNe_Thu1KL008Ao'; // Aquí debes poner el enlace de tu mini API

  constructor(private http: HttpClient) { } // HttpClient es necesario para hacer las solicitudes HTTP

  // Este método se encargará de obtener los datos de la mini API
  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Hace una solicitud GET y espera recibir datos en formato JSON
  }

  // Este método realiza solicitudes a la API cada cierto tiempo (por defecto cada 5000 ms).
  getDataWithPolling(intervalMs: number = 500): Observable<any[]> {
    return interval(intervalMs) // Genera un flujo que emite valores cada `intervalMs` milisegundos.
      .pipe(
        switchMap(() => this.getData()) // Por cada emisión, llama al método `getData` para obtener datos actualizados.
      );
  }

}
