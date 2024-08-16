import { Routes } from '@angular/router';
import { TripsComponent } from './trips/trips.component';
import { ActivitiesComponent } from './activities/activities.component';
import { TripEditComponent } from './trip-edit/trip-edit.component';

export const routes: Routes = [
  { path: 'trips', component: TripsComponent },
  { path: 'trip/:id', component: TripEditComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: '**', redirectTo: 'trips' }
];
