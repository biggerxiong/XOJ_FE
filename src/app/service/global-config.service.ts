import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../model/http/result';
import { GlobalUrlService } from './global-url.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {

  constructor(
    private http: HttpClient,
    private globalUrlService: GlobalUrlService
  ) { }

  getHeaderRouterList(): Observable<Result> {
    return this.http.get<Result>(this.globalUrlService.getHeaderRouterListUrl());
  }
}
