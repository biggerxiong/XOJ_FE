import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalUrlService {
  prefixUrl: string = 'http://localhost:8090'
  loginUrl: string = '/login'

  constructor() { }

  getLoginUrl(): string {
    return this.prefixUrl + this.loginUrl
  }
}
