import { Injectable} from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Builder } from './builddata';
import { Node } from '../models/node.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export abstract class IService extends Builder {
  protected API_URL = "http://localhost:8000/" //window.location.href;

  public get data(): Node[] { return this.dataChange.value; }

  public dataChange = new BehaviorSubject<Node[]>([]);

  public constructor(protected httpClient: HttpClient) {
    super();
  }
  
  public loading: boolean = false;

  protected buildTree(data: Array<any>): Node[] {
    var obj = this.buildData(data);
    return this._buildTreeImpl(obj);
  }
  
  private _buildTreeImpl(obj: Object) {
    var nodes = [];
    for (var k in obj) {
      var item = obj[k];
      var node = new Node();
      node.id = item.id;
      node.deleted = item.is_deleted;
      node.value = item.value;
      node.children = this._buildTreeImpl(item.children);
      nodes.push(node);
    }
    return nodes;
  }
  
  public resetNodes(): Observable<any> {
    this.loading = true;
    return this.httpClient.get(`${this.API_URL}reset/`, {
      responseType: 'text'
    }).pipe(
      map((resp) => {
        this.loading = false;
        return resp;
      })
    );
  }
}
