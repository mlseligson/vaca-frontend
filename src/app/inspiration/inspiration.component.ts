import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { vacation_activities as activityList } from '../static-data/activity-suggestions.json';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Trip, VacaApiService } from '../services/vaca-api.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectTrigger } from '@angular/material/select';

@Component({
  selector: 'app-inspiration',
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
    MatInputModule,
    MatSelectTrigger
  ],
  templateUrl: './inspiration.component.html',
  styleUrl: './inspiration.component.scss'
})
export class InspirationComponent implements OnInit {
  activityList: Array<any>;
  tripList!: Trip[];
  addTo: FormControl;
  @ViewChild('activities') activities!: MatSelectionList;

  constructor(
    private api: VacaApiService
  ) {
    this.addTo = new FormControl('');
    this.activityList = activityList;
  }

  ngOnInit(): void {
    this.api.indexTrips().subscribe({
      next: (trips: Trip[]) => {
        this.tripList = trips;
      }
    })
  }

  attemptAddActivities(): void {
    const tripId = this.addTo.value.id;
    const activities = this.activities.selectedOptions.selected.map(o => o.getLabel());

    this.api.addActivitiesBulk(tripId, activities).subscribe({
      next: (success) => { }
    });
  }

  tripNameFn(trip: Trip): string {
    return (trip && trip.name) ? trip.name : '';
  }
}
