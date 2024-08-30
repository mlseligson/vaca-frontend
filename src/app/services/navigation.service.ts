import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private loadingSubject: BehaviorSubject<boolean>;
  private titleSubject: BehaviorSubject<string>;
  loading$: Observable<boolean>;
  title$: Observable<string>;


  constructor() {
    this.loadingSubject = new BehaviorSubject<boolean>(false);
    this.titleSubject = new BehaviorSubject<string>('');

    this.loading$ = this.loadingSubject.asObservable();
    this.title$ = this.titleSubject.asObservable();
  }

  setState(state: boolean) {
    this.loadingSubject.next(state);
  }

  loadingOn() {
    this.loadingSubject.next(true);
  }

  loadingOff() {
    this.loadingSubject.next(false);
  }

  setTitle(title: string) {
    this.titleSubject.next(title);
  }
}
