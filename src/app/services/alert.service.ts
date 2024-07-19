import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSource = new Subject();
  alert$ = this.alertSource.asObservable();

  constructor() { }

  showAlert(message: string, imagenMessage = '', time:number = 3000){
    this.alertSource.next({message, time, imagenMessage});
  }

  cerrar(){
    this.alertSource.next(null);
  }

}
