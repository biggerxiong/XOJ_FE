import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StatusListComponent } from './list/status-list.component';

const routes: Routes = [
//   { path: 'new', component: EditComponent, data: {current: 0}},
//   { path: 'edit/:id', component: EditComponent, data: {current: 1}},
//   { path: ':id',component: ProblemComponent },
  { path: '', component: StatusListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatusRoutingModule { }
