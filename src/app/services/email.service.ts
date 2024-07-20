import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private API_URL = 'https://apitechplayzonevercel.vercel.app/api/send-email';

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, html: string) {
    return this.http.post(this.API_URL, { to, subject, html });
  }
}
