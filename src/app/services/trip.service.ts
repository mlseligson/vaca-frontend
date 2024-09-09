import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, mapTo, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';

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

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  indexTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(tripApiUrl);
  }

  getTrip(id: number | string): Observable<Trip> {
    if (id == "new") {
      return this.auth.currentUser$.pipe(
        map(u => ({user_id: u?.id}) as Trip)
      );
    } else {
      return this.http.get<Trip>(`${tripApiUrl}/${id}`);
    }
  }

  saveTrip(trip: Partial<Trip>): Observable<Trip> {
    return (trip.id) ?
      this.http.patch<Trip>(`${tripApiUrl}/${trip.id}`, trip):
      this.http.post<Trip>(`${tripApiUrl}`, trip);
  }

  deleteTrip(tripId: number): Observable<boolean> {
    return this.http.delete(`${tripApiUrl}/${tripId}`, {observe: 'response'}).pipe(
      map(r => r.status == 204)
    )
  }

  addActivitiesBulk(tripId: number, activities: string[]): Observable<boolean> {
    return this.http.post(`api/activities/trip/${tripId}`,
      {bulk: true, activities},
      {observe: 'response'}).pipe(
        map(r => r.status == 201)
    );
  }
}
