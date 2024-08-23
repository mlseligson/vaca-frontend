import { HttpClient } from '@angular/common/http';
import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Trip, TripService } from '../services/trip.service';
import { MatCommonModule, provideNativeDateAdapter } from '@angular/material/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { JsonPipe } from '@angular/common';

const tripApiUrl = '/api/trips';

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
    JsonPipe
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './trip-edit.component.html',
  styleUrl: './trip-edit.component.scss'
})
export class TripEditComponent implements OnInit {
  @Input({alias: 'id', transform: numberAttribute}) tripId!: number;

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
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private tripService: TripService
  ) {}

  ngOnInit(): void {
    this.tripForm = this.formBuilder.group({
      id: [{value: null, disabled: false}],
      name: ['', Validators.required],
      destination: ['', Validators.required],
      cost: [null],
      user_id: [{value: null, disabled: false}],
      image_url: [''],
      start_time: [''],
      end_time: ['']
    });

    this.tripService.getTrip(this.tripId).subscribe({
      next: (trip: Trip) => {
        this.tripForm.setValue(trip);
      }
    });
  }

  attemptSave() {
    this.tripService.updateTrip(this.tripId, this.tripForm.value).subscribe({
      next: (trip: Trip) => {
        console.log(this.tripForm.value);
      }
    });
  }
}
