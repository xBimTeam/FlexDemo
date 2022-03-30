import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { FloorplanModule } from '../floorplan/floorplan.module';
import { SpaceIndexComponent } from './space-index.component';
import { SpaceIndexState } from './spaces-state';


const routes: Routes = [
    {
        path: '',
        component: SpaceIndexComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([SpaceIndexState]),
        SharedModule,
        FloorplanModule
    ],
    declarations: [SpaceIndexComponent]
})
export class SpaceIndexModule { }
