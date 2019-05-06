import { User } from './model/User';
import { ProblemType } from './model/problem/problem-type';

export class ProblemDetail {
    problemId: number;
    title: string;
    description: string;
    inputDescription: string;
    outputDescription: string;
    descriptionMarkdown: string;
    inputDescriptionMarkdown: string;
    outputDescriptionMarkdown: string;
    samples: string;
    hint: string;
    hintMarkdown: string;
    submit: number;
    accept: number;
    createTime: string;
    createBy: User;
    ioMode: string;
    testcaseCount: number;
    timeLimit: number;
    memoryLimit: number;
    problemType: ProblemType;
  }