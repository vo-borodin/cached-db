import { Injectable} from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Node } from '../models/node.model';
import { map } from 'rxjs/operators/map';

@Injectable()
export abstract class IService {
  protected API_URL =
    window.location.href.includes("localhost") ?
      "http://localhost:8000/" : // FOR DEVELOPMENT
      window.location.href;

  public get data(): Node[] { return this.dataChange.value; }

  public dataChange = new BehaviorSubject<Node[]>([]);

  public constructor(protected httpClient: HttpClient) { }
  
  public loading: boolean = false;

  protected buildData(data: Array<any>) {
    var items = {};
    var toRemove = [];
    data.forEach((item) => {
      items[item.id] = item;
    });
    for (var k in items) {
      var parentId = items[k]["parent_id"];
      if (parentId in items) {
        if ("children" in items[parentId])
          items[parentId]["children"][k] = items[k];
        else
          items[parentId]["children"] = {k: items[k]};
        toRemove.push(k)
      }
      if (!("children" in items[k]))
          items[k]["children"] = {};
    }
    toRemove.forEach((id) => {
      delete items[id];
    })
    return this.buildTree(items);
  }

  protected buildTree(obj: Object): Node[] {
    var nodes = [];
    for (var k in obj) {
      var item = obj[k];
      var node = new Node();
      node.id = item.id;
      node.deleted = item.is_deleted;
      node.value = item.value;
      node.children = this.buildTree(item["children"]);
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
