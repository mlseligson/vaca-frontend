import { Component, OnInit } from '@angular/core';
import { TripService, Trip } from '../services/trip.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Data, RouterLink } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink, MatRippleModule],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.scss'
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (response: Data) => {
        this.trips = response['trips'];
      },
      error: () => {}
    });
  }
}
