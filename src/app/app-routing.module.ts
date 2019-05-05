import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemComponent } from './problem/problem.component';
import { EditComponent } from './pages/problem/edit/edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'problems', component: ProblemsComponent},
  {path: 'problem/new', component: EditComponent, data: {current: 0}},
  {path: 'problem/edit/:id', component: EditComponent, data: {current: 1}},
  {path: 'problem/:id', component: ProblemComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
