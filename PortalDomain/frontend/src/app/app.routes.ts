import { Routes } from '@angular/router';
import { UserComponent } from './pages/user.component';
import { isAuthenticated } from './is-authenticated.guard';
import { DashboardComponent } from './pages/dashboard.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [isAuthenticated]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
