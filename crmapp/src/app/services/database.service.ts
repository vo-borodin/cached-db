import { Injectable} from '@angular/core';
import { IService } from './iservice.service';
import { HttpClient} from  '@angular/common/http';

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
      var obj = {};
      data.forEach((item) => { obj[item['id']] = item; });
      return this.dataChange.next(this.buildTree(obj));
    }, (error) => {
      this.loading = false;
    });
  }
}
