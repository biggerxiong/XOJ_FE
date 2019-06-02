import { Component, OnInit } from '@angular/core';
import { JudgeStatusFilterRequest } from 'src/app/model/status/judge-status-filter-request';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { JudgeStatusService } from 'src/app/service/judge-status.service';
import { JudgeStatus } from 'src/app/model/submit/judge-status';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css']
})
export class StatusListComponent implements OnInit {

  noResultString = "没有符合条件的记录"
  pageSizeOptions = [10, 30, 50, 100]


  judgeStatusFilterRequest: JudgeStatusFilterRequest = new JudgeStatusFilterRequest()
  judgeStatusList: JudgeStatus[] = []
  loading: boolean = true

  constructor(
    private route: ActivatedRoute,
    private judgeStatusService: JudgeStatusService
  ) { }

  ngOnInit() {
    this.judgeStatusFilterRequest.page = 0
    this.judgeStatusFilterRequest.rows = 10
    console.log("start")

    var judgeStatusListObservable = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.loading = true
        this.judgeStatusFilterRequest.userName = params.get("userName")
        this.judgeStatusFilterRequest.problemId = params.get("problemId")
        this.judgeStatusFilterRequest.error = params.get("error")
        if (params.has("page"))
        this.judgeStatusFilterRequest.page = +params.get("page")
        if (params.has("rows"))
        this.judgeStatusFilterRequest.rows = +params.get("rows")
        console.log(this.judgeStatusFilterRequest)
        return this.judgeStatusService.getJudgeStatusList(this.judgeStatusFilterRequest)
      })
    )

    judgeStatusListObservable.subscribe(result => {
      this.judgeStatusList = result.data
      console.log("judgeStatusList: ", this.judgeStatusList)
      this.loading = false
    })

  }

  getPercent(memory: number): string {
    var str = Number(memory).toFixed(2);
    return str;
  }
}
