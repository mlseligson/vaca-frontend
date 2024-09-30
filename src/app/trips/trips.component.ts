import { Component, OnInit } from '@angular/core';
import { VacaApiService, Trip } from '../services/vaca-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Data, Router, RouterLink } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { DialogService } from '../services/dialog.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { switchMap } from 'rxjs';

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
    private route: ActivatedRoute,
    private api: VacaApiService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe({
      next: (response: Data) => {
        this.trips = response['trips'];
      },
      error: () => {}
    });
  }

  deleteTrip(trip: Trip): void {
    this.dialogService.open(ConfirmDialogComponent, {
      title: "Please Confirm",
      body: `Delete ${trip.name}?`
    }).subscribe({
      next: response => {
        if (response) {
          this.api.deleteTrip(trip.id).subscribe({
            next: wasDeleted => {
              this.trips = wasDeleted ? this.trips.filter(t => t.id != trip.id) : this.trips;
            }
          })
        }
      }
    });
  }
}
