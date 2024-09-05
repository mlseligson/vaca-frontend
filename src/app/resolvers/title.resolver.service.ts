import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, MaybeAsync, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { of, map, tap } from 'rxjs';
import { NavigationService } from '../services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class TitleResolverService implements Resolve<string> {

  constructor(
    private auth: AuthService,
    private nav: NavigationService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<string> {
    console.log("route: " + route.component?.name);

    switch (route.component?.name) {
      case "_TripsComponent":
        return this.auth.currentUsername$.pipe(
          map(user => `${user.replace(/^./, user[0].toUpperCase())}'s Trips`),
          tap(title => this.nav.setTitle(title))
        );

      case "_TripEditComponent":
        const titleObservable = (route.paramMap.get('id') == 'new') ?
          of('New trip') :
          of(route.parent?.data['trip']['name']);

        return titleObservable.pipe(
          tap(title => this.nav.setTitle(title))
        );

      default:
        return "VACA"
    }

  }
}
