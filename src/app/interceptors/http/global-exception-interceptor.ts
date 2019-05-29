import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { GlobalMessageService } from 'src/app/service/global-message.service';
import { Router } from '@angular/router';
import { mergeMap, catchError } from "rxjs/operators";
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { Result } from 'src/app/model/http/result';

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
                if (event instanceof HttpResponse) {
                    // 请求成功
                    if (event.status === 200) {
                        // console.log("event: ", event)
                        var result: Result = event.body
                        // 请求成功但服务器返回失败
                        if (result.code !== 1) {
                            this.globalMessageService.createErrorMessage(result.msg);
                            return Observable.create(observer => observer.error(event));
                        }
                    }
                    else {
                        return Observable.create(observer => observer.error(event));
                    }
                }
                return Observable.create(observer => observer.next(event));
            })
            ,catchError((res: HttpResponse<any>) => {
                switch (res.status) {
                    case 401:
                        // jwt过期会返回401
                        // break;
                    case 403:
                        if (this.authService.isLoggedIn()) {
                            // 如果处于登陆状态，判断是否过期
                            if (this.authService.isExpired()) {
                                this.globalMessageService.createErrorMessage(`登陆过期，请重新登陆`);
                                this.router.navigateByUrl('/login')
                                this.authService.logout()
                            }
                            // 如果没过期，说明没有权限
                            else {
                                this.globalMessageService.createErrorMessage(`您没有权限访问该页面`);
                            }
                        }
                        else {
                            // 如果没有登陆，则去登陆
                            this.globalMessageService.createErrorMessage(`请先登录`);
                            this.router.navigateByUrl('/login')
                            // this.authService.logout()
                        }
                        break;
                    // case 200:
                    //     // 业务层级错误处理
                    //     // this.globalMessageService.createErrorMessage(`发生错误，错误信息为：${res.body.msg}`);
                    //     console.log('res:', res)
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