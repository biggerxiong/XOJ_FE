import { Routes, RouterModule } from '@angular/router';

import { StatusListComponent } from '../status/list/status-list.component';

import { NgModule } from '@angular/core';
import { RankComponent } from './rank/rank.component';

const routes: Routes = [
  //   { path: 'new', component: EditComponent, data: {current: 0}},
  //   { path: 'edit/:id', component: EditComponent, data: {current: 1}},
  //   { path: ':id',component: ProblemComponent },
    { path: 'rank', component: RankComponent}
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserRoutingModule { }
    