import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { authInterceptor, provideAuth } from 'angular-auth-oidc-client';
import { authConfig } from './auth/auth.config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { reducers } from './state';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userFeature } from './state/user';
import { UserEffects } from './state/user/effects';
import { provideEffects } from '@ngrx/effects';
import { softwareFeature } from './state/software';
import { SoftwareEffects } from './state/software/software.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAuth(authConfig), 
    provideHttpClient(withInterceptors([authInterceptor()])), 
    provideStore(reducers), 
    provideStoreDevtools(),
    provideState(userFeature),
    provideState(softwareFeature),
    provideEffects([UserEffects, SoftwareEffects])
  ]

};
