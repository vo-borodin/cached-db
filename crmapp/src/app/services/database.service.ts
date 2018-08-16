import { IService } from './iservice.service';
import { HttpClient} from  '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Component, Injectable} from '@angular/core';
import { Node } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class Database extends IService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  getTree() {
    this.httpClient.get(`${this.API_URL}/nodes`).subscribe((data: Array<any>) => {
        this.dataChange.next(this.buildData(data));
    });
  }
}
