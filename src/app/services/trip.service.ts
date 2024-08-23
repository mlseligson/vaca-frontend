import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Trip {
  id: number;
  name: string;
  destination: string;
  cost: number;
  user_id: number;
  image_url: string;
  start_time: string;
  end_time: string;
}

const tripApiUrl = '/api/trips';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  indexTrips(): Observable<[Trip]> {
    return this.http.get<[Trip]>(tripApiUrl);
  }

  getTrip(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${tripApiUrl}/${id}`);
  }

  updateTrip(id: number, trip: Partial<Trip>): Observable<Trip> {
    return this.http.patch<Trip>(`${tripApiUrl}/${id}`, trip);
  }
}
