import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch /*, withInterceptorsFromDi*/ } from '@angular/common/http';


import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withFetch(),               
      // withInterceptorsFromDi(), // <-- optional: if you use DI-registered interceptors
    ),
    provideRouter(routes), provideClientHydration(withEventReplay())
   
  ]
};
