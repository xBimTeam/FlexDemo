import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { ModelMappingState } from './state/diffs-state';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forFeature([ModelMappingState]),
  ]
})
export class DiffSharedModule { }
