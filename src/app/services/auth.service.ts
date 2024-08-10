import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, distinctUntilChanged, from, map, throwError } from 'rxjs';

interface BasicCredentials {
  username: string;
  password: string;
}

interface JWTResponse {
  token: string;
}

interface Error {
  error: string;
}

interface JWTPayload {
  id: number;
  username: string;
  exp: number;
}

function isError(response: Error | any): response is Error {
  return (<Error>response).error !== undefined;
}

const decodeJWT = (token: string | null) => token ? JSON.parse(atob(token.split('.')[1])) : null;

const loginApiUrl = '/api/auth/login';
const tokenKey = 'vaca-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: BehaviorSubject<JWTPayload | null>;
  public currentUser$: Observable<JWTPayload | null>;
  public currentUsername$: Observable<string>;
  public loggedIn$: Observable<boolean>;

  constructor(private http: HttpClient) {
    const storedToken = localStorage.getItem(tokenKey);
    const payload = decodeJWT(storedToken);

    console.log(storedToken + ' ' + JSON.stringify(payload));

    this.currentUser = new BehaviorSubject<JWTPayload | null>(payload);
    this.currentUser$ = this.currentUser.asObservable();
    this.currentUsername$ = this.currentUser$.pipe(
      map(p => p !== null ? p.username : '')
    );

    this.loggedIn$ = this.currentUser.pipe(
      map(p => p != null ? this.verifyExpiry(p.exp) : false)
    );    
  }



  login(credentials: BasicCredentials): Observable<JWTResponse | Error> {
    return this.http.post<JWTResponse | Error>(loginApiUrl, credentials).pipe(
        map(r => {
          if (isError(r))
            throw throwError(() => r);

          localStorage.setItem(tokenKey, r.token);

          const payload = decodeJWT(r.token);
          this.currentUser.next(payload);    

          return r;
        })
      );    
  }

  logout() {
    localStorage.removeItem(tokenKey);
    this.currentUser.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(tokenKey)
  }

  verifyExpiry(expiry: number) {
    return expiry > Date.now() / 1000;
  }
}
