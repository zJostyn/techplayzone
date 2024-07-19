import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollHeight = window.pageYOffset;
    const elements = Array.from(document.querySelectorAll('.fade-in')) as HTMLElement[];
    
    elements.forEach((element: HTMLElement) => {
      if (this.isElementInViewport(element)) {
        element.classList.add('active');
      }
    });
  }

  private isElementInViewport(el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
}
