import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccesoTokenService } from '../../../services/acceso-token.service';

@Component({
  selector: 'app-barra-superior',
  templateUrl: './barra-superior.component.html',
  styleUrl: './barra-superior.component.css'
})
export class BarraSuperiorComponent {
  isDropdownOpen: boolean = false;

  constructor(private accesoToken:AccesoTokenService, private route: ActivatedRoute){}

  apartado: string= ''
  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url;

    // Asegúrate de que la URL tenga al menos una parte
    if (currentUrl.length > 0) {
      // Obtiene la última parte de la URL (la última palabra)
      this.apartado = this.capitalizarPrimeraLetra(currentUrl[currentUrl.length - 1].path);
    }
  }

  capitalizarPrimeraLetra(palabra: string): string {
    return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    this.accesoToken.salirAdmin();
  }
}
