import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CodeLanguage } from '../model/submit/code-language';
import { SubmitCode } from '../model/submit/submit-code';


@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {
  @Input() problemId: number;
  @Output() submit = new EventEmitter<SubmitCode>();

  languages: CodeLanguage[] = [
    new CodeLanguage(0, "G++"),
    new CodeLanguage(1, "GCC"),
    new CodeLanguage(4, "Pascal")
  ];
  submitCode: SubmitCode = new SubmitCode(0, "", this.problemId);

  constructor() { }

  ngOnInit() {
    this.submitCode.problemId = this.problemId
  }

  onSubmit() {
    this.submit.emit(this.submitCode);
  }
}
