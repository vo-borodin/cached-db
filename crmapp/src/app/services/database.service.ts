import { IService } from './iservice.service';
import { HttpClient} from  '@angular/common/http';
import { Injectable} from '@angular/core';
import { Node } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class Database extends IService {
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }

  readAll() {
    this.loading = true;
    return this.httpClient.get(`${this.API_URL}nodes/`).toPromise().then((data: Array<any>) => {
      this.loading = false;
      return this.dataChange.next(this.buildTree(data));
    }, (error) => {
      this.loading = false;
    });
  }
}
