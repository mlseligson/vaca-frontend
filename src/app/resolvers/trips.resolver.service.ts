import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Trip, TripService } from '../services/trip.service';

@Injectable({
  providedIn: 'root'
})
export class TripsResolverService implements Resolve<Trip[]> {

  constructor(
    private trip: TripService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Trip[]> {
    return this.trip.indexTrips();
  }
}
