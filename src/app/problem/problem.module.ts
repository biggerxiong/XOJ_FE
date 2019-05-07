import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemRoutingModule } from './problem-routing.module';
import { ProblemComponent } from './detail/problem.component';
import { SharedModule } from '../shared.module';
import { SubmitFormComponent } from '../submit-form/submit-form.component';
import { StatusComponent } from '../pages/problem/status/status.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProblemsComponent } from './list/problems.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    ProblemComponent,
    StatusComponent,
    ProblemsComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ProblemRoutingModule,
    SharedModule.forRoot(),
    FormsModule,
    HttpClientModule,
  ],
})
export class ProblemModule {
  public constructor() {
    console.log("constructor")
  }
}
