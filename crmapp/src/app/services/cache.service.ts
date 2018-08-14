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
    this.dataChange.next(this.buildData("[]"));
  }
}
