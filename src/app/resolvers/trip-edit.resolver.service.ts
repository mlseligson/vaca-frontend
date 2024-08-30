import { Injectable } from '@angular/core';
import { Trip, TripService } from '../services/trip.service';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TripEditResolverService implements Resolve<Trip> {
  constructor(private tripService: TripService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Trip> {
    return this.tripService.getTrip(route.params['id']);
  }
}
