import { Routes } from '@angular/router';
import { TripsComponent } from './trips/trips.component';
import { ActivitiesComponent } from './activities/activities.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { TripEditResolverService } from './resolvers/trip-edit-resolver.service';
import { TripsResolverService } from './resolvers/trips-resolver.service';


export const routes: Routes = [{
  path: 'trips',
  component: TripsComponent,
  resolve: { trips: TripsResolverService }
}, {
  path: 'trip/new',
  component: TripEditComponent,
  data: { trip: {} }
}, {
  path: 'trip/:id',
  component: TripEditComponent,
  resolve: { trip: TripEditResolverService }
}, {
  path: 'activities',
  component: ActivitiesComponent
}, {
  path: '**',
  redirectTo: 'trips'
}];


