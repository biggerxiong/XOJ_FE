import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ProblemService }  from '../problem.service';
import { ProblemDetail } from '../problemDetail';
import { DomSanitizer } from '@angular/platform-browser';
import { SubmitCode } from '../model/submit/submit-code';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProblemComponent implements OnInit {
  problemDetail: ProblemDetail;
  problemInputDescription: any;
  problemOutputDescription: any;
  problemHint: any;
  problemDescription: any;
  samples: JSON;

  constructor(
    private route: ActivatedRoute,
    private problemService: ProblemService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.problemService.getProblemDetail(id)
      .subscribe(result => {
        this.problemDetail = result.data;
        this.problemInputDescription = this.sanitizer.bypassSecurityTrustHtml(this.problemDetail.inputDescription);
        this.problemOutputDescription = this.sanitizer.bypassSecurityTrustHtml(this.problemDetail.outputDescription);
        this.problemHint = this.sanitizer.bypassSecurityTrustHtml(this.problemDetail.hint);
        this.problemDescription = this.sanitizer.bypassSecurityTrustHtml(this.problemDetail.description);
        this.samples = JSON.parse(this.problemDetail.samples.replace("\n", "\\r\\n"))
      });
  }

  onSubmit(submitCode: SubmitCode) {
    // console.log(submitCode)
    this.problemService.submitCode(submitCode)
      .subscribe(result => {
        console.log(result)
      })
  }
}
