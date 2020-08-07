import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { LevelIndexComponent } from './level-index.component';
import { LevelIndexState } from './level-state';




const routes: Routes = [
    {
        path: '',
        component: LevelIndexComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([LevelIndexState]),
        SharedModule
    ],
    declarations: [LevelIndexComponent]
})
export class LevelIndexModule { }
