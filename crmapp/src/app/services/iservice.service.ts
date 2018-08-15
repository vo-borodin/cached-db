import { Component, Injectable} from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Node } from '../models/node.model';

@Injectable()
export class IService {
  protected API_URL  =  'http://localhost:8000';

  public get data(): Node[] { return this.dataChange.value; }

  public dataChange = new BehaviorSubject<Node[]>([]);

  public constructor(protected httpClient: HttpClient) {
    
  }

  protected buildData(data: Array<any>) {
    return this.buildTree(data, null);
  }

  protected buildTree(data: Array<any>, parentIdx): Node[] {
    return data.filter((item) => {
      return item.parent_id === parentIdx;
    }).map<Node>((item) => {
      var node = new Node();
      node.value = item.value;
      node.deleted = item.is_deleted;
      node.children = this.buildTree(data, item.id);
      return node;
    });
  }
}
