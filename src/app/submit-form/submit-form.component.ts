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
  @Output() update = new EventEmitter<JudgeStatus>()
  isLoading = false

  languages: CodeLanguage[] = [
    new CodeLanguage(0, "G++"),
    new CodeLanguage(1, "GCC"),
    new CodeLanguage(4, "Pascal")
  ];
  submitCode: SubmitCode = new SubmitCode(0, "", this.problemId);

  constructor(
    private problemService: ProblemService
  ) { }

  ngOnInit() {
    this.submitCode.problemId = this.problemId
  }

  submitProblem() {
    this.isLoading = true
    this.problemService.submitCode(this.submitCode)
      .subscribe(result => {
        const judgeStatus: JudgeStatus = result.data
        console.log(judgeStatus)
        this.update.emit(judgeStatus)
        this.isLoading = false
      })
  }
}
