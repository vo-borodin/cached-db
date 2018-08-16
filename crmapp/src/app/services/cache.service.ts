import { IService } from './iservice.service';
import { HttpClient} from  '@angular/common/http';
import { Component, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Promise } from 'es6-promise';
import { Node } from '../models/node.model';

export enum OperationEnum {
  Create,
  Delete,
  Update
}

class Operation {
  type: OperationEnum;
  /**
   * Create:
   *   parent_id: Primary key | null
   *   -- the parent of new node
   *   value: string
   *   -- the value of new node
   * Delete:
   *   id: Primary key
   *   -- id of record to delete
   * Update:
   *   id: Primary key
   *   -- id of record to update
   *   value: string
   *   -- new value of the node
   */
  params: Array<any>
}

@Injectable({
  providedIn: 'root'
})
export class Cache extends IService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
  
  private _ids: Array<any> = [];
  private changes: Array<Operation> = [];

  set ids(newIds: Array<any>) {
    this._ids = Array.from(new Set(newIds));
  }
  
  appendOperation(type: OperationEnum, params: Array<any>) {
    var operation = new Operation();
    operation.type = type;
    operation.params = params;
    this.changes.push(operation);
  }
  
  get applyable() {
    return this.changes.length;
  }
  
  getTree() {
    var promise;
    if (this._ids.length) {
      promise = this.httpClient.get(`${this.API_URL}/nodes`, {
        params: {
          id: this._ids.map<string>((id) => { return id.toString(); })
        }
      }).toPromise();
    } else {
      promise = Promise.resolve([]);
    }
    return promise.then((data: Array<any>) => {
      return this.dataChange.next(this.buildData(data));
    });
  }
}
