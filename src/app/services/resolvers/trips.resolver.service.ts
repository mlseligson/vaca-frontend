import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { Trip, VacaApiService } from '../vaca-api.service';

@Injectable({
  providedIn: 'root'
})
export class TripsResolverService implements Resolve<Trip[]> {

  constructor(
    private api: VacaApiService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<Trip[]> {
    return this.api.indexTrips();
  }
}
