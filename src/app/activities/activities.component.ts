import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { vacation_activities } from './activity-suggestions.json';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [MatCardModule, MatListModule, MatDividerModule],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {
  activityList = vacation_activities;
}
