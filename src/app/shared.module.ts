import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzDropDownModule, NzModalModule, NzStepsModule, NzInputNumberModule, NzUploadModule } from 'ng-zorro-antd';
import { NzLayoutModule } from 'ng-zorro-antd';
import { NzGridModule } from 'ng-zorro-antd';
import { NzButtonModule } from 'ng-zorro-antd';
import { NzIconModule } from 'ng-zorro-antd';
import { NzMenuModule } from 'ng-zorro-antd';
import { NzFormModule } from 'ng-zorro-antd';
import { NzInputModule } from 'ng-zorro-antd';
import { NzSelectModule } from 'ng-zorro-antd';
import { NzEmptyModule } from 'ng-zorro-antd';
import { NzListModule } from 'ng-zorro-antd';
import { NzStatisticModule } from 'ng-zorro-antd';
import { NzTableModule } from 'ng-zorro-antd';
import { NzToolTipModule } from 'ng-zorro-antd';
import { NzSpinModule } from 'ng-zorro-antd';
import { NzSkeletonModule } from 'ng-zorro-antd';
import { NzCardModule } from 'ng-zorro-antd';
import { NzMessageModule } from 'ng-zorro-antd';
import { SubmitFormComponent } from './submit-form/submit-form.component';
import { FormsModule } from '@angular/forms';
import { ProblemService } from './problem.service';
import { httpInterceptorProviders } from './interceptors';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SubmitFormComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    NzMessageModule,
    NzCardModule,
    NzSkeletonModule,
    NzSpinModule,
    NzToolTipModule,
    NzTableModule,
    NzStatisticModule,
    NzListModule,
    NzEmptyModule,
    NzSelectModule,
    NzInputModule,
    NzFormModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzGridModule,
    NzLayoutModule,
    NzDropDownModule,
    NzModalModule,
    NzStepsModule,
    NzInputNumberModule,
    NzUploadModule,
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    SubmitFormComponent,
    NzMessageModule,
    NzCardModule,
    NzSkeletonModule,
    NzSpinModule,
    NzToolTipModule,
    NzTableModule,
    NzStatisticModule,
    NzListModule,
    NzEmptyModule,
    NzSelectModule,
    NzInputModule,
    NzFormModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzGridModule,
    NzLayoutModule,
    NzDropDownModule,
    NzModalModule,
    NzStepsModule,
    NzInputNumberModule,
    NzUploadModule
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule:SharedModule,
        providers:[ 
          ProblemService,
          httpInterceptorProviders 
        ]
    };
}
}