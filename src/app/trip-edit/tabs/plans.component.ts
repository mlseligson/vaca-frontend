import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Component, Input, numberAttribute } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Plan, QueryParams } from '../../services/trip.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { VacaDataSource } from '../../shared/VacaDataSource';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss'
})
export class PlansComponent {
  @Input({transform: numberAttribute, alias: 'trip'}) tripId: number = 0;

  data: DataSource<Plan>;
  columns = [
    { name: 'id', display: 'Plan ID' },
    { name: 'name', display: 'Name' },
    { name: 'location', display: 'Location' },
    { name: 'start_time', display: 'Start' },
    { name: 'end_time', display: 'End' }
  ];
  displayedColumns = this.columns.map(c => c.name);

  constructor() {
    this.data = new PlansDataSource(this.tripId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.data.filter = filterValue.trim().toLowerCase();
  }
}

class PlansDataSource extends VacaDataSource<Plan> {
  constructor(private tripId: number) {
    super();
  }

  override loadData(q: QueryParams): void {
    this._tripService.getPlans(this.tripId, q);
  }
}