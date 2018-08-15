import { IService } from './iservice.service';
import { HttpClient} from  '@angular/common/http';
import { Component, Injectable} from '@angular/core';
import { Node } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class Cache extends IService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getEmptyTree() {
    this.httpClient.get(`${this.API_URL}/nodes`, {
      params: {
        id: ["1", "4"]
      }
    }).subscribe((data: Array<any>) => {
      this.dataChange.next(this.buildData(data));
    });
  }
}
