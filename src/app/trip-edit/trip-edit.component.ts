import { HttpClient } from '@angular/common/http';
import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Trip } from '../services/trip.service';
import { MatCommonModule } from '@angular/material/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

const tripApiUrl = '/api/trip';

@Component({
  selector: 'app-trip-edit',
  standalone: true,
  imports: [MatCommonModule, MatExpansionModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatCardModule],
  templateUrl: './trip-edit.component.html',
  styleUrl: './trip-edit.component.scss'
})
export class TripEditComponent implements OnInit {
  @Input({transform: numberAttribute}) tripId = 0;

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

  tripForm: FormGroup;

  constructor(
    private http: HttpClient
  ) {
    this.tripForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(''),
      destination: new FormControl(''),
      cost: new FormControl(0),
      user_id: new FormControl(0),
      image_url: new FormControl(''),
      start_time: new FormControl(''),
      end_time: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.http.get<Trip>(`${tripApiUrl}/${this.tripId}`).subscribe({
      next: (trip: Trip) => {
        this.trip = trip;
      }
    })
  }

  attemptSave() {

  }

}
