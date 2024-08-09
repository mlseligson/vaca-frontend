import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, throwError } from 'rxjs';

interface BasicCredentials {
  username: string;
  password: string;
}

interface JWTPayload {
  id: number;
  username: string;
  salt: string;
  hash: string;
}

interface Error {
  error: string;
}

function isError(response: Error | any): response is Error {
  return (<Error>response).error !== undefined;
}

const loginApiUrl = `/api/auth/login`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {

  }

  login(credentials: BasicCredentials): Observable<JWTPayload | Error> {
    return this.http.post<JWTPayload | Error>(loginApiUrl, credentials).pipe(
        map(r => {
          if (isError(r))
            throw throwError(() => r);
          
          return r;
        })
      );    
  }
}
