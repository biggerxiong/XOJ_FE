import { Injectable } from '@angular/core';
import { GlobalUrlService } from './global-url.service';
import { Observable } from 'rxjs';
import { Result } from '../model/http/result';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private globalUrlService: GlobalUrlService
  ) { }

  getRankList(page: number, rows: number): Observable<Result> {
    var params = new HttpParams().set("page", page.toString())
      .set("rows", rows.toString());
    return this.http.get<Result>(this.globalUrlService.getRankListUrl(), { params })
  }
}
