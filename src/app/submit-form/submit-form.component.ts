import { Component, OnInit, Input } from '@angular/core';
import { CodeLanguage } from '../model/submit/code-language';
import { SubmitCode } from '../model/submit/submit-code';


@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {
  @Input() problemId: number;

  languages: CodeLanguage[] = [
    new CodeLanguage(0, "G++"),
    new CodeLanguage(1, "GCC"),
    new CodeLanguage(4, "Pascal")
  ];
  submitCode: SubmitCode = new SubmitCode(0, "", this.problemId);

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }
}
