import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ProblemIntro } from "./problemIntro";
import { ProblemDetail } from "./problemDetail";
import { Observable, of } from 'rxjs';
import { SubmitCode } from './model/submit/submit-code';
import { Result } from './model/http/result';

const problemDetails: ProblemDetail[] = [
  // {problemId: 1000, title: "A+B problem", description: "<p>请计算两个整数的和并输出结果。</p><p>注意不要有不必要的输出，比如&quot;请输入 a 和 b 的值: &quot;，示例代码见隐藏部分。</p>", inputDescription: "<p>两个用空格分开的整数.</p>", outputDescription: "<p>两数之和</p>", samples: '[{"input": "1 1", "output": "2"},{"input": "2 1", "output": "3"},{"input": "2 2", "output": "4"}]', hint: '<p>C 语言实现:</p><pre><code class="lang-c++">#include &lt;stdio.h&gt;    \nint main(){\n    int a, b;\n    scanf(&quot;%d%d&quot;, &a, &b);\n    printf(&quot;%d\\n&quot;, a+b);\n    return 0;\n}</code></pre><p>Java 实现:</p><pre><code class="lang-java">import java.util.Scanner;\npublic class Main{\n    public static void main(String[] args){\n        Scanner in=new Scanner(System.in);\n        int a=in.nextInt();\n        int b=in.nextInt();\n        System.out.println((a+b));  \n    }\n}</code></pre>' ,submit: 11, accept: 2, createTime:"2015-09-02T13:02:26Z", createBy: "XiongXuan", ioMode: 'input: "input.txt", output: "output.txt", io_mode: "Standard IO"', testcaseCount: 5, timeLimit: 1000, memoryLimit: 128},
  // {problemId: 1001, title: "test1", description: "<p>请计算两个整数的和并输出结果。</p><p>注意不要有不必要的输出，比如&quot;请输入 a 和 b 的值: &quot;，示例代码见隐藏部分。</p>", inputDescription: "<p>两个用空格分开的整数.</p>", outputDescription: "<p>两数之和</p>", samples: '[{"input": "1 1", "output": "2"}]', hint: '<p>C 语言实现:</p><pre><code class="lang-c++">#include &lt;stdio.h&gt;    \nint main(){\n    int a, b;\n    scanf(&quot;%d%d&quot;, &a, &b);\n    printf(&quot;%d\n&quot;, a+b);\n    return 0;\n}</code></pre><p>Java 实现:</p><pre><code class="lang-java">import java.util.Scanner;\npublic class Main{\n    public static void main(String[] args){\n        Scanner in=new Scanner(System.in);\n        int a=in.nextInt();\n        int b=in.nextInt();\n        System.out.println((a+b));  \n    }\n}</code></pre>' ,submit: 11, accept: 2, createTime:"2015-09-02T13:02:26Z", createBy: "XiongXuan", ioMode: 'input: "input.txt", output: "output.txt", io_mode: "Standard IO"', testcaseCount: 5, timeLimit: 1000, memoryLimit: 128},
  // {problemId: 1002, title: "test2", description: "<p>请计算两个整数的和并输出结果。</p><p>注意不要有不必要的输出，比如&quot;请输入 a 和 b 的值: &quot;，示例代码见隐藏部分。</p>", inputDescription: "<p>两个用空格分开的整数.</p>", outputDescription: "<p>两数之和</p>", samples: '[{"input": "1 1", "output": "2"}]', hint: '<p>C 语言实现:</p><pre><code class="lang-c++">#include &lt;stdio.h&gt;    \nint main(){\n    int a, b;\n    scanf(&quot;%d%d&quot;, &a, &b);\n    printf(&quot;%d\n&quot;, a+b);\n    return 0;\n}</code></pre><p>Java 实现:</p><pre><code class="lang-java">import java.util.Scanner;\npublic class Main{\n    public static void main(String[] args){\n        Scanner in=new Scanner(System.in);\n        int a=in.nextInt();\n        int b=in.nextInt();\n        System.out.println((a+b));  \n    }\n}</code></pre>' ,submit: 11, accept: 2, createTime:"2015-09-02T13:02:26Z", createBy: "XiongXuan", ioMode: 'input: "input.txt", output: "output.txt", io_mode: "Standard IO"', testcaseCount: 5, timeLimit: 1000, memoryLimit: 128},
  // {problemId: 1003, title: "test3", description: "<p>请计算两个整数的和并输出结果。</p><p>注意不要有不必要的输出，比如&quot;请输入 a 和 b 的值: &quot;，示例代码见隐藏部分。</p>", inputDescription: "<p>两个用空格分开的整数.</p>", outputDescription: "<p>两数之和</p>", samples: '[{"input": "1 1", "output": "2"}]', hint: '<p>C 语言实现:</p><pre><code class="lang-c++">#include &lt;stdio.h&gt;    \nint main(){\n    int a, b;\n    scanf(&quot;%d%d&quot;, &a, &b);\n    printf(&quot;%d\n&quot;, a+b);\n    return 0;\n}</code></pre><p>Java 实现:</p><pre><code class="lang-java">import java.util.Scanner;\npublic class Main{\n    public static void main(String[] args){\n        Scanner in=new Scanner(System.in);\n        int a=in.nextInt();\n        int b=in.nextInt();\n        System.out.println((a+b));  \n    }\n}</code></pre>' ,submit: 11, accept: 2, createTime:"2015-09-02T13:02:26Z", createBy: "XiongXuan", ioMode: 'input: "input.txt", output: "output.txt", io_mode: "Standard IO"', testcaseCount: 5, timeLimit: 1000, memoryLimit: 128},

];

@Injectable({
  providedIn: 'root'
})

export class ProblemService {
  private submitUrl = "http://localhost:8090/submit"
  private problemListUrl = "http://localhost:8090/problems"
  private problemDetailUrl = "http://localhost:8090/problem/"
  private judgeStatusUrl = "http://localhost:8090/status/"

  constructor(
    private http: HttpClient,
  ) { }

  getProblemList(): Observable<Result> {
    return this.http.get<Result>(this.problemListUrl);
  }

  getProblemDetail(id: number): Observable<Result> {
    return this.http.get<Result>(this.problemDetailUrl + id);
  }

  getJudgeStatus(id: number): Observable<Result> {
    return this.http.get<Result>(this.judgeStatusUrl + id);
  }

  submitCode(submitCode: SubmitCode): Observable<Result>  {
    // console.log(submitCode)
    const body: HttpParams = new HttpParams()
      .set('source', encodeURIComponent(submitCode.source))
      .set('language', String(submitCode.language))
      .set('problemId', String(submitCode.problemId))
    console.log(body)
    return this.http.post<Result>(this.submitUrl, body, 
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      })
  }
}
