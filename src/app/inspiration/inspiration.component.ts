import { Component, OnInit, signal, Signal, ViewChild, WritableSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { vacation_activities as activityList } from '../static-data/activity-suggestions.json';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Suggestion, Trip, VacaApiService } from '../services/vaca-api.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectTrigger } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { StepperSelectionEvent } from '@angular/cdk/stepper';

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
    MatStepperModule,
    MatChipsModule
  ],
  templateUrl: './inspiration.component.html',
  styleUrl: './inspiration.component.scss'
})
export class InspirationComponent implements OnInit {

  tripList!: Trip[];
  addTo: FormControl;
  @ViewChild('activities') activities!: MatSelectionList;

  tripSelectFormGroup: FormGroup;
  keywordsFormGroup: FormGroup;
  suggestionsFormGroup: FormGroup;
  keywords: WritableSignal<string[]>;
  suggestions: WritableSignal<Suggestion[]>;

  constructor(
    private api: VacaApiService,
    private formBuilder: FormBuilder
  ) {
    this.addTo = new FormControl('');

    this.tripSelectFormGroup = formBuilder.group({
      trip: this.formBuilder.control('', Validators.required)
    });

    this.keywordsFormGroup = formBuilder.group({
      keywords: this.formBuilder.control('')
    });

    this.suggestionsFormGroup = formBuilder.group({
      suggestions: this.formBuilder.control('')
    });

    this.keywords = signal([]);
    this.suggestions = signal([]);
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

  onStepChange(e: StepperSelectionEvent) {
    if (e.selectedIndex == 2 && e.previouslySelectedIndex == 1) {
      const tripId = this.tripSelectFormGroup.value.trip.id;
      const example = this.keywords().reduce((acc: string, x: string) => `${acc}, ${x}`);
      this.api.getInspiration(tripId, example).subscribe({
        next: (result) => this.suggestions.update(s => result.suggestions)
      });
    }
  }
}
