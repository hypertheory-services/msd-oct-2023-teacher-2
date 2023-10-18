import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OidcSecurityService } from "angular-auth-oidc-client";
import { RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { selectUserIssues, userFeature } from "../state/user";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="container">
      <h1>Issue Portal</h1>
      <div>
        <button
          *ngIf="!loggedIn"
          class="btn btn-sm  btn-primary"
          (click)="login()"
        >
          Log In
        </button>
        <button
          *ngIf="loggedIn"
          class="btn  btn-sm btn-primary"
          (click)="logout()"
        >
          Log Out {{ name }}
        </button>
      </div>

      <ul class="nav nav-tabs justify-content-center">
        <li class="nav-item">
          <a class="nav-link" routerLink="user" [routerLinkActive]="['active']"
            >Your User Page</a
          >
        </li>
        <li class="nav-item" *ngIf="user() !== ''">
          <a
            class="nav-link"
            routerLink="issues"
            [routerLinkActive]="['active']"
            >See Issues</a
          >
        </li>
      </ul>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  service = inject(OidcSecurityService);
  store = inject(Store);
  user = this.store.selectSignal(userFeature.selectId);

  loggedIn = false;
  name = "";

  ngOnInit() {
    this.service.checkAuth().subscribe(({ isAuthenticated, userData }) => {
      this.loggedIn = isAuthenticated;
      this.name = userData?.sub;
    });
  }

  login() {
    this.service.authorize();
  }

  logout() {
    this.service.logoff().subscribe((result) => console.log(result));
  }
}
