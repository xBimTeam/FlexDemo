import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiffListComponent } from './diff-list/diff-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxsModule } from '@ngxs/store';
import { ModelMappingState } from './state/diffs-state';
import { DiffDetailComponent } from './diff-detail/diff-detail.component';

const routes: Routes = [
  {
    path: ':id/detail',
    component: DiffDetailComponent
  },
  {
    path: '',
    component: DiffListComponent,
  },
];



@NgModule({
  declarations: [DiffListComponent, DiffDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([ModelMappingState]),
    SharedModule
  ]
})
export class DiffsModule { }
