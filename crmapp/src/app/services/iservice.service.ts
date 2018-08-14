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

  protected buildData(strData: string) {
    // Parse the string to json object.
    const dataArray = JSON.parse(strData);

    // Build the tree nodes from Json object. The result is a list of `Node` with nested
    //     node as children.
    return this.buildTree(dataArray, -1);
    //return this.httpClient.get(`${this.API_URL}/tree`);
  }

  protected buildTree(arr: Array<any>, parentIdx): Node[] {
    return arr.map<any>((item, index) => {
      return { item: item, index: index };
    }).filter((elem) => {
      return elem.item.parent === parentIdx;
    }).map<Node>((elem) => {
      var node = new Node();
      node.value = elem.item.value;
      node.deleted = elem.item.deleted;
      node.children = this.buildTree(arr, elem.index);
      return node;
    });
  }
}
