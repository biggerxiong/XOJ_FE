import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { NzModalService } from 'ng-zorro-antd';
import { GlobalMessageService } from '../service/global-message.service';
import { GlobalConfigService } from '../service/global-config.service';
import { GlobalUrlService } from '../service/global-url.service';
import { RouterInfo } from '../model/config/router-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  routerInfoList: RouterInfo[] = []
  routerEnd: Observable<NavigationEnd>;
  currentUser: User
  loggedIn: boolean = false
  lastUrl: string

  constructor(
    private router: Router, 
    private authService: AuthService,
    private modalService: NzModalService,
    private globalMessageService: GlobalMessageService,
    private globalConfigService: GlobalConfigService,
    private globalUrlService: GlobalUrlService
    ) { 

    this.routerEnd = router.events.pipe(
      filter(evt => evt instanceof NavigationStart)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit() {
    const that = this
    this.flashRouterInfoListFormLocalStorage()
    this.routerEnd.subscribe(evt => {
      this.currentUser = this.authService.getCurrentUser()
      this.loggedIn = this.authService.isLoggedIn()

      if (this.lastUrl === this.globalUrlService.loginUrl) {
        that.globalConfigService.getHeaderRouterList()
        .subscribe(result => {
          this.routerInfoList = result.data
          localStorage.setItem("routerInfoList", JSON.stringify(this.routerInfoList))
        })
      } else {
        this.flashRouterInfoListFormLocalStorage()
      }
      console.log('header sub: ', evt)
      this.lastUrl = evt.url
    });

  }

  flashRouterInfoListFormLocalStorage() {
    const routerInfoList = JSON.parse(localStorage.getItem('routerInfoList'))
    this.routerInfoList = routerInfoList
    // this.routerInfoList = []
    // var routerInfo = new RouterInfo()
    // routerInfo.routerLink = "/home"
    // routerInfo.routerName = "主页"
    // routerInfo.iconType = "home"
    // routerInfo.iconTheme = "fill"
    // this.routerInfoList.push(routerInfo)
    
    // routerInfo = new RouterInfo()
    // routerInfo.routerLink = "/problem/list"
    // routerInfo.routerName = "题目"
    // routerInfo.iconType = "book"
    // routerInfo.iconTheme = "fill"
    // this.routerInfoList.push(routerInfo)
  }

  onLogoutItemClick() {
    const tplModal = this.modalService.create({
      nzTitle: '确认注销',
      nzContent: '确定注销吗？注销后你将重新登陆',
      nzClosable: true,
      nzOnOk: () => new Promise(resolve => {
        this.authService.logout()
        localStorage.removeItem('routerInfoList')
        this.router.navigateByUrl('/')
        tplModal.destroy()
        this.globalMessageService.createSuccessMessage("注销成功")
      })
    })
  }
}
