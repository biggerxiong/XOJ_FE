import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalUrlService {
  loginUrl: string = '/login'

  constructor() { }

  getLoginUrl(): string {
    return this.loginUrl
  }
}
