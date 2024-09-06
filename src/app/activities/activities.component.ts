import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { vacation_activities as activityList } from '../static-data/activity-suggestions.json';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Trip, TripService } from '../services/trip.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent implements OnInit {
  activityList: Array<any>;
  tripList!: Trip[];
  addTo: FormControl;
  @ViewChild('activities') activities!: MatSelectionList;

  constructor(
    private tripService: TripService
  ) {
    this.addTo = new FormControl('');
    this.activityList = activityList;
  }

  ngOnInit(): void {
    this.tripService.indexTrips().subscribe({
      next: (trips: Trip[]) => {
        this.tripList = trips;
      }
    })
  }

  attemptAddActivities(): void {
    const tripId = this.addTo.value
    const activities = this.activities.selectedOptions.selected.map(o => o.value);
    this.tripService.addActivitiesBulk(tripId, activities).subscribe({
      next: (success) => {}
    });
  }
}
