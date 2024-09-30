import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable } from "rxjs";
import { QueryParams } from "../services/vaca-api.service";

export abstract class VacaDataSource<T> extends DataSource<T> {
  protected _data: BehaviorSubject<T[]>;
  private _loading: BehaviorSubject<boolean>;

  constructor() {
    super();
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