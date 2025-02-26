import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouteReuseStrategy, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './data/services/token.iterceptor';
import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage } from 'ngx-webstorage';
import { progressInterceptor } from 'ngx-progressbar/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { displayErrorinterceptor } from './data/services/displayError.interceptor';
import { BASE_PATH } from './data/services/rest';
import { environment } from '../environments/environment';
import { CustomRouteReuseStrategy } from './customRouteStrategy';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),     
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([
      tokenInterceptor,
      progressInterceptor,
      displayErrorinterceptor
    ])),
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage()
    ), 
    provideAnimationsAsync(),
    {
      provide: BASE_PATH,
      useValue: environment.API_BASE_PATH
    },
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy }
  ]
};
