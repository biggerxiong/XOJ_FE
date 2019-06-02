import { SharedModule } from '../shared.module';
import { NgModule } from '@angular/core';
import { StatusRoutingModule } from './status-routing.module';
import { StatusListComponent } from './list/status-list.component';

@NgModule({
    declarations: [
        StatusListComponent
    ],
    imports: [
      SharedModule.forRoot(),
      StatusRoutingModule,
    ],
  })
  export class StatusModule {
    public constructor() {

    }
  }