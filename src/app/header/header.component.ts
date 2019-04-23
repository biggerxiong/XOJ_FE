import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { NzModalService } from 'ng-zorro-antd';
import { GlobalMessageService } from '../service/global-message.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  routerEnd: Observable<NavigationEnd>;
  currentUser: User
  loggedIn: boolean = false

  constructor(
    private router: Router, 
    private authService: AuthService,
    private modalService: NzModalService,
    private globalMessageService: GlobalMessageService) { 

    this.routerEnd = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit() {
    this.routerEnd.subscribe(evt => {
      this.currentUser = this.authService.getCurrentUser()
      this.loggedIn = this.authService.isLoggedIn()
    });

  }

  onLogoutItemClick() {
    const tplModal = this.modalService.create({
      nzTitle: '确认注销',
      nzContent: '确定注销吗？注销后你将重新登陆',
      nzClosable: true,
      nzOnOk: () => new Promise(resolve => {
        this.authService.logout()
        this.router.navigateByUrl('/')
        tplModal.destroy()
        this.globalMessageService.createSuccessMessage("注销成功")
      })
    })
  }
}
