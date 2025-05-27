import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap, throwError } from 'rxjs';
import { storageKeys } from '../static-data/local-storage-keys.json';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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

const loginApiUrl = environment.apiUrl + '/api/auth/login';
const tokenKey = 'vaca-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: BehaviorSubject<JWTPayload | null>;
  public currentUser$: Observable<JWTPayload | null>;
  public currentUsername$: Observable<string>;
  public loggedIn$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
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

        const payload = decodeJWT(r.token);
        this.currentUser.next(payload);

        localStorage.setItem(storageKeys["token"], r.token);

        return r;
      }),
      tap(() => this.router.navigate(['/']))
    );
  }

  logout() {
    localStorage.removeItem(storageKeys["token"]);
    this.currentUser.next(null);
    this.router.navigate([], { skipLocationChange: true });
  }

  getToken(): string | null {
    return localStorage.getItem(storageKeys["token"])
  }

  verifyExpiry(expiry: number) {
    return expiry > Date.now() / 1000;
  }

}
