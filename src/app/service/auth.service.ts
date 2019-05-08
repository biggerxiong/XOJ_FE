import { Injectable } from '@angular/core';
import { User } from '../model/User';
import { Router } from '@angular/router';
import { GlobalUrlService } from './global-url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Result } from '../model/http/result';
import { GlobalMessageService } from './global-message.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loggedIn = false
  private currentUser: User
  private expiredTime: number

  constructor(private router: Router, 
    private globalUrlService: GlobalUrlService,
    private http: HttpClient,
    private globalMessageService: GlobalMessageService
    ) { 
    const token = localStorage.getItem('token')
    console.log('authService init, get token from localStorage: ', token)
    // const token = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOjIsInN1YiI6Inhpb25neHVhbiIsImV4cCI6MTU1NTk5Mjg0Nn0.UYTh3mN4WsmBJ7WqD7W4c_Sg8XfXHktr12TK5c0s3qo5XV4IRsadDHPvxk66jj3YlRP8cQKQRSnex_y6V5o8AA"
    if (token) {
      this.loggedIn = true
      this.currentUser = this.decodeUserFromToken(token)
      this.expiredTime = this.decodeExpiredTimeFromToken(token)
    }
  }

  decodeUserFromToken(token: string): User {
    const jsonString = atob(token.split('.')[1])
    const jsonObject = JSON.parse(jsonString)
    const user = new User()
    user.id = jsonObject['userId']
    user.userName = jsonObject['sub']

    return user
  }

  decodeExpiredTimeFromToken(token: string): number {
    const jsonString = atob(token.split('.')[1])
    const jsonObject = JSON.parse(jsonString)
    const expiredTime: number = Number.parseInt(jsonObject['expiredTime'])
    return expiredTime
  }

  login(userName: string, password: string, callback: Function) {
    
    this.http.post<Result>(this.globalUrlService.getLoginUrl(),
      {"userName": userName, "password": password}, httpOptions)
      .subscribe(result => {
        if (result.code === 1) {
          const token = result.msg
          localStorage.setItem("token", token)
          this.loggedIn = true
          this.currentUser = this.decodeUserFromToken(token)
          this.expiredTime = this.decodeExpiredTimeFromToken(token)
        }
        callback(result.code, result.msg)
      })
  }

  logout() {
    this.loggedIn = false
    localStorage.removeItem("token")
    this.currentUser = null
  }

  getCurrentUser(): User {
    return this.currentUser
  }

  isLoggedIn(): boolean {
    return this.loggedIn
  }

  isExpired(): boolean {
    return new Date().getTime() > this.expiredTime
  }
}
