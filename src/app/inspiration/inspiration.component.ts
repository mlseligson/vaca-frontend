import { Component, OnInit, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { vacation_activities as activityList } from '../static-data/activity-suggestions.json';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Trip, VacaApiService } from '../services/vaca-api.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectTrigger } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';

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
    MatSelectTrigger,
    MatStepperModule,
    MatChipsModule
  ],
  templateUrl: './inspiration.component.html',
  styleUrl: './inspiration.component.scss'
})
export class InspirationComponent implements OnInit {
  activityList: Array<any>;
  tripList!: Trip[];
  addTo: FormControl;
  @ViewChild('activities') activities!: MatSelectionList;

  tripSelectFormGroup: FormGroup;
  keywordsFormGroup: FormGroup;
  keywords: WritableSignal<string[]>;

  constructor(
    private api: VacaApiService,
    private formBuilder: FormBuilder
  ) {
    this.addTo = new FormControl('');
    this.activityList = activityList;

    this.tripSelectFormGroup = formBuilder.group({
      trip: this.formBuilder.control('', Validators.required)
    });

    this.keywordsFormGroup = formBuilder.group({
      keywords: this.formBuilder.control('')
    });

    this.keywords = signal([]);
  }

  ngOnInit(): void {
    this.api.indexTrips().subscribe({
      next: (trips: Trip[]) => {
        this.tripList = trips;
      }
    })
  }

  addKeyword(event: MatChipInputEvent): void {
    const activity = (event.value || '').trim();

    // Add our keyword
    if (activity && activity.length) {
      this.keywords.update(k => [...k, activity]);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeKeyword(keyword: string): void {
    this.keywords.update(k => {
      const i = k.indexOf(keyword);
      if (i >= 0)
        k.splice(i, 1);
      
      return k;
    });
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
