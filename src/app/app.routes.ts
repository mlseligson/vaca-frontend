import { Routes } from '@angular/router';
import { TripsComponent } from './trips/trips.component';
import { ActivitiesComponent } from './activities/activities.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';
import { TripEditResolverService } from './resolvers/trip-edit.resolver.service';
import { TripsResolverService } from './resolvers/trips.resolver.service';
import { TitleResolverService } from './resolvers/title.resolver.service';


export const routes: Routes = [{
  path: 'trips',
  resolve: { trips: TripsResolverService },
  children: [{
    path: '',
    component: TripsComponent,
    title: TitleResolverService
  }]
}, {
  path: 'trip/new',
  component: TripEditComponent,
  data: { new: true },
  title: TitleResolverService
}, {
  path: 'trip/:id',
  resolve: { trip: TripEditResolverService },
  children: [{
    path: '',
    component: TripEditComponent,
    title: TitleResolverService   
  }]
}, {
  path: 'activities',
  component: ActivitiesComponent,
  title: TitleResolverService
}, {
  path: '**',
  redirectTo: 'trips'
}];


