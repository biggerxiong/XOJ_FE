import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProblemComponent } from './detail/problem.component';
import { EditComponent } from './edit/edit.component';
import { ProblemsComponent } from './list/problems.component';

const routes: Routes = [
  { path: 'list', component: ProblemsComponent},
  { path: 'new', component: EditComponent, data: {current: 0}},
  { path: 'edit/:id', component: EditComponent, data: {current: 1}},
  { path: ':id',component: ProblemComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProblemRoutingModule { }
