import { Component, Injectable} from '@angular/core';
import { HttpClient} from  '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Node } from '../models/node.model';

@Injectable()
export abstract class IService {
  protected API_URL  =  'http://localhost:8000';

  public get data(): Node[] { return this.dataChange.value; }

  public dataChange = new BehaviorSubject<Node[]>([]);

  public constructor(protected httpClient: HttpClient) { }

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
  
  public abstract getTree();
  
  public resetNodes(): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/reset/`, { responseType: 'text' });
  }
}
