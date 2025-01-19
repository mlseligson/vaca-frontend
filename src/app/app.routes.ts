import { Routes } from '@angular/router';
import { TripsComponent } from './trips/trips.component';
import { InspirationComponent } from './inspiration/inspiration.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { TripEditResolverService } from './services/resolvers/trip-edit.resolver.service';
import { TripsResolverService } from './services/resolvers/trips.resolver.service';
import { TitleResolverService } from './services/resolvers/title.resolver.service';
import { FlightsComponent } from './trip-edit/tabs/flights.component';
import { PlansComponent } from './trip-edit/tabs/plans.component';
import { MediaComponent } from './trip-edit/tabs/media.component';


export const routes: Routes = [{
  path: 'trips',
  resolve: { trips: TripsResolverService },
  children: [{
    path: '',
    component: TripsComponent,
    title: TitleResolverService
  }],
  runGuardsAndResolvers: 'always'
}, {
  path: 'trip/:id',
  resolve: { trip: TripEditResolverService },
  children: [{
    path: '',
    component: TripEditComponent,
    title: TitleResolverService,
    children: [{
      path: 'flights',
      component: FlightsComponent
    }, {
      path: 'plans',
      component: PlansComponent
    }, {
      path: 'media',
      component: MediaComponent
    }, {
      path: '**',
      redirectTo: 'plans'
    }]
  }]
}, {
  path: 'inspiration',
  component: InspirationComponent,
  title: TitleResolverService
}, {
  path: '**',
  redirectTo: 'trips'
}];


