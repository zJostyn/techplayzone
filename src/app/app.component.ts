import { Component } from '@angular/core';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'TechPlayZone';
  showAlert = false;
  message = '';
  imagenMessage = '';

  constructor(private alert_service:AlertService){}

  ngOnInit() {
    let timeoutId: any;
  
    this.alert_service.alert$.subscribe((res: any) => {
      if (res === null) {
        this.showAlert = false;
        // Cancelar el temporizador si existe
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
      } else {
        this.message = res.message;
        this.imagenMessage = res.imagenMessage;
        this.showAlert = true;
        // Establecer el temporizador y almacenar su ID en timeoutId
        timeoutId = setTimeout(() => {
          this.showAlert = false;
        }, res.time);
      }
    });
  }
  

  cerrarAlerta(){
    this.alert_service.cerrar();
  }

}
