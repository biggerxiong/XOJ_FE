import { Component, OnInit } from '@angular/core';
import { ProblemIntroService } from "../problem-intro.service";
import { ProblemIntro } from '../problemIntro';

@Component({
  selector: 'app-problems',
  templateUrl: './problems.component.html',
  styleUrls: ['./problems.component.css']
})

export class ProblemsComponent implements OnInit {

  problemIntros: ProblemIntro[];

  constructor(private problemIntroService: ProblemIntroService) { }

  ngOnInit() {
    this.problemIntroService.getProblems()
      .subscribe(problemIntros => this.problemIntros = problemIntros);
  }




}
