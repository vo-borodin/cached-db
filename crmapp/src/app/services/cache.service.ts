import { IService } from './iservice.service';
import { Operation } from './operations';
import { HttpClient} from  '@angular/common/http';
import { Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { merge } from 'rxjs/observable/merge';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';
import { Node } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class Cache extends IService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    
    merge(this._addIdSubject.pipe(
      switchMap((id) => {
        this.loading = true;
        return this.httpClient.get(`${this.API_URL}/nodes`, {
          params: {
            id: id.toString()
          }
        });
      }),
      map((data) => {
        this.loading = false;
        this._rawNodes = this._rawNodes.concat(data);
      })
    ), this._changesSubject).subscribe(() => {
      var preApplied = this.preApplyChanges();
      return this.dataChange.next(this.buildData(preApplied));
    });
  }
  
  private _addIdSubject = new Subject();
  
  private _rawNodes: Array<any> = [];
  
  private _changes: Array<Operation> = [];
  private _changesSubject = new Subject();
  
  public clear() {
    this._rawNodes = [];
  }
  
  public contains(id: any): Boolean {
    return this._rawNodes.some((rawNode) => {
      return rawNode.id == id;
    });
  }

  public addNode(id: any) {
    return this._addIdSubject.next(id);
  }
  
  public addOperation(op: Operation) {
    this._changes.push(op);
    this._changesSubject.next(this._changes);
  }
  
  get applyable() {
    return this._changes.length;
  }
  
  preApplyChanges(): Array<any> {
    return this._changes.reduce((accum, operation) => {
      return operation.call(accum);
    }, this._rawNodes);
  }
}
