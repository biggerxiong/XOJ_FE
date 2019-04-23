import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { GlobalMessageService } from 'src/app/service/global-message.service';
import { Router } from '@angular/router';
import { mergeMap, catchError } from "rxjs/operators";
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Injectable()
export class GlobalExceptionInterceptor implements HttpInterceptor {

    constructor(
        private globalMessageService: GlobalMessageService, 
        private router: Router,
        private authService: AuthService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        console.log('GlobalExceptionInterceptor')
        
        return <any>next.handle(req).pipe(
            mergeMap((event: any) => {
                if (event instanceof HttpResponse && event.status !== 200) {
                    console.log("event: ", event)
                    return Observable.create(observer => observer.error(event));
                }
                return Observable.create(observer => observer.next(event));
            })
            ,catchError((res: HttpResponse<any>) => {
                switch (res.status) {
                    case 401:
                    case 403:
                        // 权限处理
                        this.router.navigateByUrl('/login')
                        this.authService.logout()
                        break;
                    // case 200:
                    //     // 业务层级错误处理
                    //     this.globalMessageService.createErrorMessage(`发生错误，错误信息为：${res.body.msg}`);
                    //     break;
                    case 404:
                        this.globalMessageService.createErrorMessage(`API不存在`);
                        break;
                    case 500:
                        this.globalMessageService.createErrorMessage(`请求错误，请重试`);
                        break;
                }
                // 以错误的形式结束本次请求
                // return Observable.throw(res);
                return throwError(res)
            }))
    }
}