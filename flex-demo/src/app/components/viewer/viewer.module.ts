import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { ViewerState } from '@xbim/flex-webkit';
import { ViewerComponent } from './viewer.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: ViewerComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([ViewerState]),
        SharedModule
    ],
    declarations: [ViewerComponent]
})
export class ViewerModule { }
