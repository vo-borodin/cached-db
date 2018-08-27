import { Injectable} from '@angular/core';
import { IService } from './iservice.service';
import { HttpClient } from  '@angular/common/http';
import { merge } from 'rxjs/observable/merge';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators/map';
import { Subject } from 'rxjs';
import { Operation, OperationFactory } from './operations';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class Cache extends IService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    
    merge(this._addIdSubject.pipe(
      switchMap((id: any) => {
        this.loading = true;
        return this.httpClient.get(`${this.API_URL}single/`, {
          params: {
            id: id.toString(),
            reload: this._reloadCache.toString()
          }
        });
      }),
      map((nodes) => {
        this._reloadCache = false;
        this._rawNodes[nodes[0]['id']] = nodes[0];
        this.updateRelations(JSON.parse(nodes[0]['relation_info']));
      })
    ), this._changesSubject).subscribe(() => {
      this.loading = false;
      var preApplied = this.preApplyChanges();
      return this.dataChange.next(this.buildTree(preApplied));
    }, (error) => {
      this.loading = false;
    });
  }
  
  private _addIdSubject = new Subject();
  
  private _rawNodes: Object = {};
  private _reloadCache: Boolean = true;
  
  private _changes: Array<Operation> = [];
  private _changesSubject = new Subject();
  
  private preApplyChanges(): Object {
    return this._changes.reduce((accum, operation) => {
      return operation.call(accum);
    }, JSON.parse(JSON.stringify(this._rawNodes)));
  }
  
  private updateOperations(infoArray: Array<any>) {
    this._changes = infoArray.map<Operation>((item) => {
      return OperationFactory.get(item);
    });
  }
  
  private updateRelations(newRelations: Object) {
    for (const id in this._rawNodes) {
      var rawNode = this._rawNodes[id];
      if (rawNode['id'] in newRelations) {
        if (newRelations[rawNode['id']] != null)
          rawNode['relation'] = parseInt(newRelations[rawNode['id']]);
        else
          rawNode['relation'] = null;
      }
    }
  }
  
  public clearChanges() {
    this._changes = [];
    return this._changesSubject.next();
  }
  
  public clear() {
    this._reloadCache = true;
    this._rawNodes = {};
  }
  
  public contains(id: any): Boolean {
    return (id in this._rawNodes);
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
  
  public applyChangesToBase() {
    this.loading = true;
    return this.httpClient.post<any>(`${this.API_URL}apply`, {
        params: {
          changes: this._changes
        }
      }
    ).pipe(map((resp) => {
      this.loading = false;
      this.updateOperations(resp.changes);
      this._rawNodes = this.preApplyChanges();
      return this.clearChanges();
    }), catchError((err, _) => {
      this.loading = false;
      throw err;
    }));
  }
}
