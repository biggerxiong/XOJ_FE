import { Component, OnInit } from '@angular/core';
import { ProblemService } from "../problem.service";
import { ProblemIntro } from '../problemIntro';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})

export class ProblemsComponent implements OnInit {

  problemIntros: ProblemIntro[];

  constructor(private problemIntroService: ProblemService) { }

  ngOnInit() {
    // this.problemIntroService.getProblemIntros()
    //   .subscribe(problemIntros => this.problemIntros = problemIntros);
    this.problemIntroService.getProblemList()
      .subscribe(result => {
        this.problemIntros = result.data
      });
  }

  getPercent(accept: number, submit: number): string {
    var str = Number(accept/submit*100).toFixed(2);
    str += "%";
    return str;
  }


}
