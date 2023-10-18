import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header.component";

@Component({
    selector: 'app-root',
    standalone: true,
    template: `
  <app-header />
  <main class="container">
    
    <section>
      <router-outlet></router-outlet>
    </section>
  </main>
  `,
    styles: [],
    imports: [CommonModule, RouterOutlet, HeaderComponent]
})
export class AppComponent {

}
