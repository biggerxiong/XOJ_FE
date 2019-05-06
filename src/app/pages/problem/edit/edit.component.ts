import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProblemDetail } from 'src/app/problemDetail';
import { GlobalMessageService } from 'src/app/service/global-message.service';
import { ProblemService } from 'src/app/problem.service';
import { UploadFilter, UploadFile } from 'ng-zorro-antd';
import { GlobalUrlService } from 'src/app/service/global-url.service';

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
  testCases: any = []
  testCaseCount: number = 1
  problemId: number
  fileUploadUrl: string

  constructor(
    private route: ActivatedRoute,
    private globalMessageService: GlobalMessageService,
    private problemService: ProblemService,
    private router: Router,
    private globalUrlService: GlobalUrlService
  ) { }

  ngOnInit() {
    this.mode = +this.route.snapshot.data.current;
    if (this.mode == 0) {
      this.problemDetail.timeLimit = 1000
      this.problemDetail.memoryLimit = 128
    }
    else {
      this.problemId = +this.route.snapshot.paramMap.get('id')
      this.problemService.getProblemDetail(this.problemId)
        .subscribe(result => {
          this.problemDetail = result.data
          const jsonArray = JSON.parse(this.problemDetail.samples)
          for (let i in jsonArray) {
            const element = jsonArray[i]
            this.testCases.push({"input": element['input'], "output": element['output']})
          }
        })
        
      this.fileUploadUrl = this.globalUrlService.getUploadTestCaseUrl(this.problemId)
    }
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
    this.isLoading = true
    // 去除测试样例中输入输出都为空的
    for (let i = 0; i < this.testCases.length; i++) {
      const element = this.testCases[i];
      if (element.input === "" && element.output === "") {
        this.testCases.splice(i, 1)
      }
    }
    this.problemDetail.samples = JSON.stringify(this.testCases)
    if (this.mode == 0) {
      this.problemService.createProblem(this.problemDetail)
        .subscribe(result => {
          this.problemDetail = result.data
          this.globalMessageService.createSuccessMessage("创建成功")
          this.isLoading = false
          this.router.navigateByUrl('/problem/edit/' + this.problemDetail.problemId)
        })
    } else {
      this.problemService.editProblem(this.problemDetail, this.problemId)
        .subscribe(result => {
          this.problemDetail = result.data
          this.globalMessageService.createSuccessMessage("修改成功")
          this.isLoading = false
        })
    }
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

  handleChange({ file, fileList }: { [key: string]: any }): void {
    const status = file.status;

    if (status === 'done') {
      this.globalMessageService.createSuccessMessage(`${file.name} 上传成功，数据分发需 5 ~ 10 分钟`);
    } else if (status === 'error') {
      this.globalMessageService.createErrorMessage(`${file.name} 上传失败`);
    }
  }
}
