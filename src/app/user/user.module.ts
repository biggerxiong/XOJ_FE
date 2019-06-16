import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { UserRoutingModule } from './user-routing.module';
import { RankComponent } from './rank/rank.component';

@NgModule({
  declarations: [
    RankComponent
  ],
  imports: [
    SharedModule.forRoot(),
    UserRoutingModule,
  ],
})
export class UserModule {
  public constructor() {

  }
}