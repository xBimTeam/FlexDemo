import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiffListComponent } from './diff-list/diff-list.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DiffDetailComponent } from './diff-detail/diff-detail.component';
import { DiffSharedModule } from '../shared/diff-shared.module';
import { LostItemsComponent } from './diff-detail/lost-items/lost-items.component';
import { FoundItemsComponent } from './diff-detail/found-items/found-items.component';
import { CandidateItemsComponent } from './diff-detail/candidate-items/candidate-items.component';
import { MomentModule } from 'ngx-moment';
import { MappedItemsComponent } from './diff-detail/mapped-items/mapped-items.component';
import { TooltipComponent } from './diff-detail/tooltip/tooltip.component';
import { NgxsModule } from '@ngxs/store';
import { TooltipState } from './diff-detail/tooltip/tooltip.state';

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
  declarations: [DiffListComponent, DiffDetailComponent, LostItemsComponent, FoundItemsComponent, CandidateItemsComponent, MappedItemsComponent, TooltipComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([TooltipState]),
    SharedModule,
    MomentModule,
    DiffSharedModule
  ]
})
export class DiffsModule { }
