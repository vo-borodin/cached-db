import { IService } from './iservice.service';
import { HttpClient} from  '@angular/common/http';
import { Component, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Promise } from 'es6-promise';
import { Node } from '../models/node.model';

enum OperationEnum {
  Create,
  Delete,
  Update
}

export abstract class Operation {
  public abstract call(nodes: Node[]): Node[];
}

export class Create extends Operation {
  /** parent_id: Primary key | null
   *    -- the parent of new node
   */
  private _parentId: any;
  /** value: string
   *    -- the value of new node
   */
  private _value: string;
  
  constructor(parentId: any, value: string) {
    super();
    
    this._parentId = parentId;
    this._value = value;
  }
  
  public call(nodes: Node[]): Node[] {
    return nodes;
  }
}

export class Delete extends Operation {
  /** id: Primary key
   *    -- id of record to delete
   */
  private _id: any;
  
  constructor(id: any) {
    super();
    
    this._id = id;
  }
  
  public call(nodes: Node[]): Node[] {
    return nodes;
  }
}

export class Update extends Operation {
  /** id: Primary key
   *    -- id of record to update
   */
  private _id: any;
  
  /** value: string
   *    -- new value of the node
   */
  private _value;
  
  constructor(id: any, value: string) {
    super();
    
    this._id = id;
    this._value = value;
  }
  
  public call(nodes: Node[]): Node[] {
    return nodes;
  }
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

  public addId(newId: any) {
    this._ids.push(newId);
  }
  
  public clearIds() {
    this._ids = [];
  }
  
  public get ids(): Array<any> {
    return this._ids;
  }
  
  appendOperation(op: Operation) {
    this.changes.push(op);
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
