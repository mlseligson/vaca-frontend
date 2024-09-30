import { routes } from './app.routes';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withRouterConfig } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './services/interceptors/loading.interceptor';
import { jwtAuthInterceptor } from './services/interceptors/jwt-auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withRouterConfig({
      onSameUrlNavigation: 'reload'
    })),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        jwtAuthInterceptor
      ])
    )
  ]
};
