import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpEvent, HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private router: Router) {
        
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // Get the auth token from the service.
        // const authToken = this.auth.getAuthorizationToken();
        // const authToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ4aW9uZ3h1YW4iLCJleHAiOjE1NTYzNzczNjR9.JGbp2kWoAeAKzfA6k4WJdcnwZzzLHvFqT6F5xZ-uuElkOD_i3d1qBGgVA01cRkIPn6NfVxrYE15vZ14P7h0Ftw";
        const authToken = "";
    
        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization.
        const authReq = req.clone({
            headers: req.headers.set('Authorization', authToken)
        });
        
        console.log("token: ", authReq)

        // send cloned request with header to the next handler.
        return next.handle(authReq)
    }
}
