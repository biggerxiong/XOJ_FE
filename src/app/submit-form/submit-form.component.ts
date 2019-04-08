import { Component, OnInit } from '@angular/core';
import { CodeLanguage } from '../model/submit/code-language';
import { SubmitCode } from '../model/submit/submit-code';


@Component({
  selector: 'app-submit-form',
  templateUrl: './submit-form.component.html',
  styleUrls: ['./submit-form.component.css']
})
export class SubmitFormComponent implements OnInit {

  languages: CodeLanguage[] = [
    new CodeLanguage(0, "G++"),
    new CodeLanguage(1, "GCC"),
    new CodeLanguage(4, "Pascal")
  ];
  submitCode: SubmitCode = new SubmitCode(0, "");

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {

  }
}
