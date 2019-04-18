import { User } from './model/User';

export class ProblemDetail {
    problemId: number;
    title: string;
    description: string;
    inputDescription: string;
    outputDescription: string;
    samples: string;
    hint: string;
    submit: number;
    accept: number;
    createTime: string;
    createBy: User;
    ioMode: string;
    testcaseCount: number;
    timeLimit: number;
    memoryLimit: number;
    problemType: number;
  }