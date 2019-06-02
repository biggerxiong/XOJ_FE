import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalUrlService{
  // protocol: string = "https://"
  // address: string = "api.xoj.ac.cn"
  // port: string
  // prefixUrl: string
  // dist = "/oj"
  protocol: string = "http://"
  address: string = "localhost"
  port: string = "8090"
  prefixUrl: string
  dist = ""

  loginUrl = "/login"
  uploadTestCaseUrl = "/upload/data/{problemId}"
  submitUrl = "/submit"
  problemListUrl = "/problems"
  problemDetailUrl = "/problem/{problemId}"
  problemEditDetailUrl = "/problem/edit/{problemId}"
  judgeStatusUrl = "/status/{judgeStatusId}"
  judgeStatusListUrl = "/status"
  createProblemUrl = "/problem/new"
  editProblemUrl = "/problem/edit/{problemId}"
  headerRouterListUrl = "/config/header/list"
  problemIsAcceptUrl = "/status/is_accept/{problemId}"
  

  constructor() {
    this.prefixUrl = this.protocol + this.address
    if (this.port) {
      this.prefixUrl = this.prefixUrl + ":" + this.port
    }
    this.prefixUrl = this.prefixUrl + this.dist
    console.log('pre: ', this.prefixUrl)
  }

  getProblemListUrl() {
    return this.prefixUrl + this.problemListUrl
  }

  getCreateProblemUrl() {
    return this.prefixUrl + this.createProblemUrl
  }

  getLoginUrl(): string {
    return this.prefixUrl + this.loginUrl
  }

  getUploadTestCaseUrl(problemId: number) {
    return this.prefixUrl + this.uploadTestCaseUrl.replace('{problemId}', problemId.toString())
  }

  getEditProblemUrl(problemId: number) {
    return this.prefixUrl + this.editProblemUrl.replace('{problemId}', problemId.toString())
  }

  getProblemIsAcceptUrl(problemId: number) {
    return this.prefixUrl + this.problemIsAcceptUrl.replace('{problemId}', problemId.toString())
  }

  getProblemDetailUrl(problemId: number) {
    return this.prefixUrl + this.problemDetailUrl.replace('{problemId}', problemId.toString())
  }

  getProblemEditDetailUrl(problemId: number) {
    return this.prefixUrl + this.problemEditDetailUrl.replace('{problemId}', problemId.toString())
  }

  getJudgeStatusUrl(judgeStatusId: number) {
    return this.prefixUrl + this.judgeStatusUrl.replace('{judgeStatusId}', judgeStatusId.toString())
  }

  getJudgeStatusListUrl() {
    return this.prefixUrl + this.judgeStatusListUrl;
  }

  getSubmitUrl() {
    return this.prefixUrl + this.submitUrl
  }

  getHeaderRouterListUrl() {
    return this.prefixUrl + this.headerRouterListUrl
  }
}
