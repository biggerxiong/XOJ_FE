import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CodeLanguage } from '../model/submit/code-language';
import { SubmitCode } from '../model/submit/submit-code';
import { ProblemService } from '../problem.service';
import { JudgeStatus } from '../model/submit/judge-status';


@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {
  @Input() problemId: number
  @Output() update = new EventEmitter<number>()
  isLoading = false

  languages: CodeLanguage[] = [
    new CodeLanguage(1, "G++"),
    new CodeLanguage(2, "GCC"),
    new CodeLanguage(3, "Pascal")
  ];
  submitCode: SubmitCode = new SubmitCode(1, "", this.problemId);

  constructor(
    private problemService: ProblemService
  ) { }

  ngOnInit() {
    this.submitCode.problemId = this.problemId
    this.submitCode.languageId = 1
  }

  submitProblem() {
    this.isLoading = true
    this.problemService.submitCode(this.submitCode)
      .subscribe(result => {
        const judgeStatus: JudgeStatus = result.data
        console.log(judgeStatus)
        this.update.emit(judgeStatus.judgeStatusId)
        this.isLoading = false
      })
  }
}
