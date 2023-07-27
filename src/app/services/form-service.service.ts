import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  private apiUrl = environment.apiUrl;
  private msg: string = '';

  constructor(private httpClient: HttpClient) { }

  enviarFormulario(formData: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, formData);
  }

  setMessage(message: string): void {
    this.msg = message;
  }

  getMessage(): string {
    return this.msg;
  }
}
