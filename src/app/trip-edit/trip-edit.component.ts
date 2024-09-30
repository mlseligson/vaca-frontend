import { HttpClient } from '@angular/common/http';
import { Component, Input, numberAttribute, OnInit, Type } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Trip, VacaApiService } from '../services/vaca-api.service';
import { MatCommonModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { JsonPipe } from '@angular/common';
import { ActivatedRoute, Data, Router, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [
    MatCommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    JsonPipe,
    MatTabsModule,
    RouterModule,
    MatIconModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './trip-edit.component.html',
  styleUrl: './trip-edit.component.scss'
})
export class TripEditComponent implements OnInit {
  @Input({alias: 'id', transform: numberAttribute}) tripId!: number;

  links = [
    { text: 'Plans', link: 'plans', icon: 'travel_explore'},
    { text: 'Flights', link: 'flights', icon: 'airplane_ticket' },
    { text: 'Accommodations', link: 'accommodations', icon: 'flights_and_hotels'}
  ];

  trip: Trip = {
    id: 0,
    name: '',
    destination: '',
    cost: 0,
    user_id: 0,
    image_url: '',
    start_time: '',
    end_time: ''
  };

  tripForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private api: VacaApiService
  ) { }

  ngOnInit(): void {
    this.tripForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      destination: ['', Validators.required],
      cost: [null],
      user_id: [null],
      image_url: [''],
      start_time: [''],
      end_time: ['']
    });

    this.route.data.subscribe({
      next: (data: Data) => {
        this.tripForm.patchValue(data['trip']);
      }
    })
  }

  onRouterOutletPopulated(component: Type<any>) {
    // component.tripId = this.tripId;

    const hasProp = <T extends object>(obj: T, key: string): obj is T & {[key: string]: unknown} => Object.hasOwn(obj, key);

    if (hasProp(component, 'tripId')) {
      component['tripId'] = this.tripId;
    }
  }

  attemptSave() {
    this.api.saveTrip(this.tripForm.value).subscribe({
      next: (trip: Trip) => {
        if (!this.tripForm.value.id)
          this.router.navigate(['trip', trip.id]);
        else
          this.tripForm.patchValue(trip);
      }
    });    
  }
}
