import { Injectable } from '@angular/core';
import { GlobalUrlService } from './global-url.service';
import { Observable } from 'rxjs';
import { Result } from '../model/http/result';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JudgeStatusService {

  constructor(
    private http: HttpClient,
    private globalUrlService: GlobalUrlService
    ) { }

  problemIsAccept(problemId: number): Observable<Result> {
    return this.http.get<Result>(this.globalUrlService.getProblemIsAcceptUrl(problemId))
  }
}
