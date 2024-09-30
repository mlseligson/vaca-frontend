import { Injectable } from '@angular/core';
import { Trip, VacaApiService } from '../vaca-api.service';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TripEditResolverService implements Resolve<Trip> {
  constructor(private api: VacaApiService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Trip> {
    return this.api.getTrip(route.params['id']);
  }
}
