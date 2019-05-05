import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProblemDetail } from 'src/app/problemDetail';
import { GlobalMessageService } from 'src/app/service/global-message.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {
  // 0代表创建，1代表修改
  mode: number
  // 0代表创建或修改题目表单，1代表上传数据表单
  current: number = 0
  isLoading: boolean = false
  problemDetail: ProblemDetail = new ProblemDetail()
  testCases: any = [{"input": "", "output": ""}]
  testCaseCount: number = 1

  constructor(
    private route: ActivatedRoute,
    private globalMessageService: GlobalMessageService
  ) { }

  ngOnInit() {
    this.mode = +this.route.snapshot.data.current;
    this.problemDetail.timeLimit = 1000
    this.problemDetail.memoryLimit = 128
  }

  changeStep(stepId: number) {
    // 如果处在创建状态，并且想切换到上传数据选项，则无效
    if (this.mode == 0 && stepId == 1) {
      this.globalMessageService.createWarningMessage("请先创建题目")
    }
    else {
      this.current = stepId
    }
  }

  submitForm() {
    this.problemDetail.memoryLimit = this.problemDetail.memoryLimit * 1024 * 1024
    // 去除测试样例中输入输出都为空的
    for (let i = 0; i < this.testCases.length; i++) {
      const element = this.testCases[i];
      if (element.input === "" && element.output === "") {
        this.testCases.splice(i, 1)
      }
    }
    this.problemDetail.samples = JSON.stringify(this.testCases)
    console.log(this.problemDetail)
  }

  addTestCase() {
    if (this.testCaseCount >= 6) {
      this.globalMessageService.createErrorMessage('最多创建7个测试样例')
    }
    else {
      this.testCases.push({"input": "", "output": ""})
      this.testCaseCount++
    }
  }
}
