import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NavigationService } from './navigation.service';
import { delay, finalize } from 'rxjs';

export const SkipLoading = new HttpContextToken<boolean>(() => false);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  if (req.context.get(SkipLoading)) {
    return next(req);
  }

  const loadingService = inject(NavigationService);
  loadingService.loadingOn();

  return next(req).pipe(
    finalize(() => setTimeout(() => loadingService.loadingOff(), 200))
  );
};
