import { HttpHeaders, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const jwtAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  const jwtReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  });

  return next(jwtReq);
};
