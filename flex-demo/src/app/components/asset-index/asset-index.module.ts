import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { AssetEntityState } from '@xbim/flex-webkit';
import { AssetIndexComponent } from './asset-index.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    {
        path: '',
        component: AssetIndexComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([AssetEntityState]),
        SharedModule
    ],
    declarations: [AssetIndexComponent]
})
export class AssetIndexModule { }
