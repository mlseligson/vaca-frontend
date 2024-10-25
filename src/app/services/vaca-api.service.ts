import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

export interface Trip {
  id: number;
  name: string;
  destination: string;
  cost: number;
  user_id: number;
  image?: File | null;
  image_url: string;
  start_time: string;
  end_time: string;
}

export interface Plan {
  id: number;
  name: string;
  description: string;
  location: string;
  image_url: string;
  start_time: string;
  end_time: string;
  trip_id: number;
}

export interface QueryParams {
  filter: string;
  sort: string;
  order: string;
  page: number;
  limit: number;
}

const tripApiUrl = '/api/trips';

@Injectable({
  providedIn: 'root'
})
export class VacaApiService {

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
        map(u => ({ user_id: u?.id }) as Trip)
      );
    } else {
      return this.http.get<Trip>(`${tripApiUrl}/${id}`);
    }
  }

  saveTrip(trip: Partial<Trip>): Observable<Trip> {
    const form = new FormData();

    for (let [key, field] of Object.entries<string | number | Blob | null>(trip)) {
      if (!field || key == 'image_url')
        break;

      if (typeof field == 'number') {
        field = String(field);
      }
      
      if (field instanceof File) {
        form.append(key, field, field.name);
      } else {
        form.append(key, field);
      }
    }

    return trip.id ?
      this.http.patch<Trip>(`${tripApiUrl}/${trip.id}`, form):
      this.http.post<Trip>(tripApiUrl, form);
  }

  deleteTrip(tripId: number): Observable<boolean> {
    return this.http.delete(`${tripApiUrl}/${tripId}`, { observe: 'response' }).pipe(
      map(r => r.status == 204)
    )
  }

  addActivitiesBulk(tripId: number, activities: string[]): Observable<boolean> {
    return this.http.post(`/api/activities/trip/${tripId}`,
      { bulk: true, activities },
      { observe: 'response' }).pipe(
        map(r => r.status == 201)
      );
  }

  getPlans(tripId: number, queryParams: QueryParams): Observable<Plan[]> {
    return this.http.get<Plan[]>(`/api/activities/trip/${tripId}`, {
      params: { ...queryParams }
    });
  }
}
