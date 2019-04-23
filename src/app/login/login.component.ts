import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { GlobalMessageService } from '../service/global-message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  isLoading: boolean = false
  isLoginFailed: boolean = false
  loginFailedMsg: string = ""

  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private globalMessageService: GlobalMessageService,
    private router: Router) {
      this.loginCallback = this.loginCallback.bind(this)
    }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    
    this.isLoading = true
    this.authService.login(this.validateForm.get('userName').value,
      this.validateForm.get('password').value,
      this.loginCallback)
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  loginCallback(code: number, msg: string) {
    if (code === 1) {
      this.globalMessageService.createSuccessMessage("登陆成功")
      this.router.navigateByUrl('/problems')
    }
    else {
      this.isLoginFailed = true
      this.loginFailedMsg = msg
    }
    this.isLoading = false
  }
}
