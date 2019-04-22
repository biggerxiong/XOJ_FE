import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from "./http/auth-interceptor";
import { GlobalExceptionInterceptor } from './http/global-exception-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: GlobalExceptionInterceptor, multi: true },
];