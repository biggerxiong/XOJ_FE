import { User } from '../User';
import { ProblemDetail } from 'src/app/problemDetail';
import { CodeLanguage } from './code-language';
import { TestCaseResult } from './test-case-result';

export class JudgeStatus {
    judgeStatusId: number
    problem: ProblemDetail
    user: User
    remoteId: string
    language: CodeLanguage
    codeFilePath: string
    score: number
    error: number
    result: string
    timeCost: number
    memoryCost: number
    createTime: Date
    errorMsg: string
}
