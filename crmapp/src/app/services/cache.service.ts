import { IService } from './iservice.service';
import { Operation } from './operations';
import { HttpClient } from  '@angular/common/http';
import { Injectable} from '@angular/core';
import { Subject, of } from 'rxjs';
import { merge } from 'rxjs/observable/merge';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators';
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
        return this.httpClient.get(`${this.API_URL}/nodes/`, {
          params: {
            id: id.toString()
          }
        });
      }),
      map((nodes) => {
        this._rawNodes = this._rawNodes.concat(nodes);
      })
    ), this._changesSubject).subscribe(() => {
      this.loading = false;
      var preApplied = this.preApplyChanges();
      return this.dataChange.next(this.buildData(preApplied));
    }, (error) => {
      this.loading = false;
    });
  }
  
  private _addIdSubject = new Subject();
  
  private _rawNodes: Array<any> = [];
  
  private _changes: Array<Operation> = [];
  private _changesSubject = new Subject();
  
  private preApplyChanges(): Array<any> {
    return this._changes.reduce((accum, operation) => {
      return operation.call(accum);
    }, this._rawNodes.slice());
  }
  
  public clearChanges() {
    this._changes = [];
    this._changesSubject.next();
  }
  
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
  
  public get applyable() {
    return this._changes.length;
  }
  
  public applyChanges() {
    this.loading = true;
    return this.httpClient.post<any>(`${this.API_URL}/apply`, {
        params: {
          changes: this._changes
        }
      }
    ).pipe(map((resp) => {
      this.loading = false;
      this.clear();
      this.clearChanges();
      return resp;
    }), catchError((err, _) => {
      this.loading = false;
      throw err;
    }));
  }
}
