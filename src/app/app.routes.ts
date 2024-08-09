import { Routes } from '@angular/router';
import { TripsComponent } from './trips/trips.component';
import { ActivitiesComponent } from './activities/activities.component';

export const routes: Routes = [
  { path: 'trips', component: TripsComponent },
  { path: 'activities', component: ActivitiesComponent }
];
