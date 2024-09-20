import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { QueryParams, TripService } from "../services/trip.service";
import { inject } from "@angular/core";

export abstract class VacaDataSource<T> extends DataSource<T> {
  private _data: BehaviorSubject<T[]>;
  private _loading: BehaviorSubject<boolean>;
  protected _tripService: TripService;

  constructor(
  ) {
    super();
    this._tripService = inject(TripService);
    this._data = new BehaviorSubject<T[]>([]);
    this._loading = new BehaviorSubject<boolean>(false);
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this._data.asObservable();
  }

  disconnect() {
    this._data.complete();
    this._loading.complete();
  }

  abstract loadData(q: QueryParams): void;
}