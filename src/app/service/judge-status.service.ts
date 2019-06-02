import { Injectable } from '@angular/core';
import { GlobalUrlService } from './global-url.service';
import { Observable } from 'rxjs';
import { Result } from '../model/http/result';
import { HttpClient, HttpParams } from '@angular/common/http';
import { JudgeStatusFilterRequest } from '../model/status/judge-status-filter-request';

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

  getJudgeStatusList(judgeStatusFilterRequest: JudgeStatusFilterRequest): Observable<Result> {
    var params = new HttpParams().set("page", judgeStatusFilterRequest.page.toString())
      .set("rows", judgeStatusFilterRequest.rows.toString());
    if (judgeStatusFilterRequest.userName != null) 
      params = params.set("problemId", judgeStatusFilterRequest.userName)
    if (judgeStatusFilterRequest.problemId != null) 
      params = params.set("problemId", judgeStatusFilterRequest.problemId.valueOf())
    if (judgeStatusFilterRequest.error != null) 
      params = params.set("problemId", judgeStatusFilterRequest.error.valueOf())
    return this.http.get<Result>(this.globalUrlService.getJudgeStatusListUrl(), { params })
  }

  getJudgeStatus(id: number): Observable<Result> {
    return this.http.get<Result>(this.globalUrlService.getJudgeStatusUrl(id));
  }
}
