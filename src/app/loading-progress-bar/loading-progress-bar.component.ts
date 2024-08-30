import { Component, Input, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable, tap } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-progress-bar',
  standalone: true,
  imports: [MatProgressBarModule, CommonModule],
  templateUrl: './loading-progress-bar.component.html',
  styleUrl: './loading-progress-bar.component.scss'
})
export class LoadingProgressBarComponent implements OnInit {
  loading$: Observable<boolean>;

  @Input() detectRouteTransitions = false;

  constructor(
    private loadingService: NavigationService,
    private router: Router
  ) {
    this.loading$ = this.loadingService.loading$;
  }

  ngOnInit() {
    if (this.detectRouteTransitions) {
      this.router.events.pipe(
        tap((event) => {
          if (event instanceof RouteConfigLoadStart) {
            this.loadingService.setState(true);
          } else if (event instanceof RouteConfigLoadEnd) {
            this.loadingService.setState(false);
          }
        })
      ).subscribe();
    }
  }
}