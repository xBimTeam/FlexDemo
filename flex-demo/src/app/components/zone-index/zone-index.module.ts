import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { ZoneIndexComponent } from './zone-index.component';
import { ZoneIndexState } from './zone-state';

const routes: Routes = [
    {
        path: '',
        component: ZoneIndexComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([ZoneIndexState]),
        SharedModule
    ],
    declarations: [ZoneIndexComponent]
})
export class ZoneIndexModule { }
