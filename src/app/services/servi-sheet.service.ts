import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleSheetsService2 {
  private apiUrl = 'https://script.google.com/macros/s/AKfycbxRtsBNcm0CywKgiYswVJYCaeaKHBdS8PDG2Qto55HY2i16ejawmZ3DDHUZZCHOKVyd/exec';  // Reemplázala con la URL obtenida en Apps Script

  constructor(private http: HttpClient) {}

  enviarDato(valor: string) {
    return this.http.post(this.apiUrl, { valor }, { responseType: 'text' });
  }
}
