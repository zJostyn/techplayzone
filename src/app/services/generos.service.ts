import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  API_URL = 'https://apitechplayzonevercel.vercel.app/api/';

  constructor(private http:HttpClient) { }

  getGeneros(){
    return this.http.get(`${this.API_URL}generos`);
  }

}
