import { Injectable } from '@angular/core';
import { ProblemIntro } from "./problemIntro";
import { Observable, of } from 'rxjs';

const problems: ProblemIntro[] = [
  {id: 1000, title: "A+B problem", submit: 11, accept: 2},
  {id: 1001, title: "test1", submit: 10, accept: 2},
  {id: 1002, title: "test2", submit: 10, accept: 0},
  {id: 1003, title: "test2", submit: 0, accept: 0},
];

@Injectable({
  providedIn: 'root'
})

export class ProblemIntroService {

  constructor() { }

  getProblems(): Observable<ProblemIntro[]> {
    return of(problems);
  }
}
