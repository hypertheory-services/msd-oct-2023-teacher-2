import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { softwareFeature } from '../state/software';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>Software Portal</h3>
    <p>We provide support for the following titles:</p>
    <div class="alert alert-info" *ngIf="software().length === 0">
      <p>Sorry! There is no software in the catalog.</p>
      <p>This means we don't support anything. Good luck!</p>
    </div>
    <ul class="list-unstyled">
      <li *ngFor="let sw of software()">
        <h5>{{sw.title}}</h5>
      </li>
    </ul>
  `,
  styles: [
  ]
})
export class DashboardComponent {
  store = inject(Store);
  software = this.store.selectSignal(softwareFeature.selectActiveSoftware);
}
