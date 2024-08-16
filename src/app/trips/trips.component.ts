import { Component, OnInit } from '@angular/core';
import { TripService, Trip } from '../services/trip.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-trips',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.scss'
})
export class TripsComponent implements OnInit {
  trips: Trip[] = [];

  constructor(
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.tripService.indexTrips().subscribe({
      next: (trips: Trip[]) => {
        this.trips = trips;
      },
      error: () => {}
    });
  }
}
