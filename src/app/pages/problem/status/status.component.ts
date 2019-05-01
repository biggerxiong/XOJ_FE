import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProblemService } from 'src/app/problem.service';
import { JudgeStatus } from 'src/app/model/submit/judge-status';
import { TestCaseResult } from 'src/app/model/submit/test-case-result';

@Component({
  selector: 'app-problem-detail-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnChanges {

  @Input() judgeStatusId: number
  judgeStatus: JudgeStatus
  private timer;//定时器
  statusDesc: string[] = ['Wrong Answer', 'Accept', 'Time Limit Exceeded'
                          , 'Time Limit Exceeded', 'Memory Limit Exceeded'
                          , 'Runtime Error', 'System Error']
  statusCss: string[] = ['reject', 'accept', 'time-limit', 'time-limit'
                          , 'memory-limit', 'runtime-error', 'runtime-error']
  testCaseResults: TestCaseResult[]

  constructor(private problemService: ProblemService) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', this.judgeStatusId)
    // 初始化评测状态
    this.judgeStatus = new JudgeStatus();
    this.judgeStatus.error = 0;

    // 初始化定时器
    this.stopTimer()

    this.timer = setInterval(() => {//设置定时刷新事件，每隔5秒刷新
      this.updateJudgeStatus();
    }, 2000)
  }

  updateJudgeStatus() {
    if (this.judgeStatusId) {
      const that = this
      this.problemService.getJudgeStatus(this.judgeStatusId).subscribe(
        result => {
          this.judgeStatus = result.data
          if (this.judgeStatus.error != 0) {
            if (this.judgeStatus.error == 1) {
              this.testCaseResults = JSON.parse(this.judgeStatus.result)
            } else {
              this.judgeStatus.errorMsg = this.judgeStatus.errorMsg.replace('\\n', '<br/>')
            }
            that.stopTimer()
          }
        }
      )
    }
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  ngOnDestroy() {
    this.stopTimer()
  }

  getPercent(memory: number): string {
    var str = Number(memory).toFixed(2);
    return str;
  }
}
