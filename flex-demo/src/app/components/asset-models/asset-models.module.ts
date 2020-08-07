import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { AssetModelEntityState } from '@xbim/flex-webkit';
import { SharedModule } from '../../shared/shared.module';
import { AssetModelsComponent } from './asset-models.component';

const routes: Routes = [
    {
        path: '',
        component: AssetModelsComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([AssetModelEntityState]),
        SharedModule
    ],
    declarations: [AssetModelsComponent]
})
export class AssetModelsModule { }
