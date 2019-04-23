import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { HeaderComponent } from './header/header.component';

import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from 'ng-zorro-antd';

import { httpInterceptorProviders } from "./interceptors/index";

// 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️
import { BookFill, TrophyFill, PieChartFill, HomeFill, MailOutline, SmileTwoTone, SyncOutline, FrownTwoTone } from '@ant-design/icons-angular/icons';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemComponent } from './problem/problem.component';
import { SubmitFormComponent } from './submit-form/submit-form.component';
import { NzDropDownModule } from 'ng-zorro-antd';
import { NzModalModule } from 'ng-zorro-antd';

const icons: IconDefinition[] = [ HomeFill, BookFill, TrophyFill, PieChartFill, MailOutline, SmileTwoTone, SyncOutline, FrownTwoTone ];

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    ProblemsComponent,
    ProblemComponent,
    SubmitFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NzDropDownModule,
    NzModalModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#00ff00' }, // 不提供的话，即为 Ant Design 的主题蓝色
    { provide: NZ_ICONS, useValue: icons },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
