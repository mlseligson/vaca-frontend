import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Plan, QueryParams, VacaApiService } from '../../services/vaca-api.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VacaDataSource } from '../../shared/VacaDataSource';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-plans',
    imports: [MatFormFieldModule, MatInputModule, MatTableModule],
    templateUrl: './plans.component.html',
    styleUrl: './plans.component.scss'
})
export class PlansComponent implements OnInit {
  @Input({ transform: numberAttribute }) tripId!: number;
  filterSource$ = new Subject<string>();

  data!: PlansDataSource;
  columns = [
    { name: 'id', display: 'Plan ID' },
    { name: 'name', display: 'Name' },
    { name: 'location', display: 'Location' },
    { name: 'start_time', display: 'Start' },
    { name: 'end_time', display: 'End' }
  ];
  displayedColumns = this.columns.map(c => c.name);

  constructor(
    private api: VacaApiService
  ) {
    this.filterSource$.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      takeUntilDestroyed()
    ).subscribe({
      next: (filter) => {
        this.data.loadData({
          filter,
          sort: 'id',
          order: 'asc',
          page: 0,
          limit: 10
        });
      }
    });
  }

  ngOnInit(): void {
    this.data = new PlansDataSource(this.api, this.tripId);
    this.data.loadData({
      filter: '',
      sort: 'id',
      order: 'asc',
      page: 0,
      limit: 10
    });
  }
}

class PlansDataSource extends VacaDataSource<Plan> {
  constructor(
    private _api: VacaApiService,
    private tripId: number) {
    super();
  }

  loadData(q: QueryParams): void {
    this._api.getPlans(this.tripId, q).subscribe({
      next: (plans) => this._data.next(plans)
    });
  }
}