import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { TeamEntityState } from '@xbim/features/team/shared';
import { SharedModule } from '../../shared/shared.module';
import { TeamComponent } from './team.component';



const routes: Routes = [
    {
        path: '',
        component: TeamComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([TeamEntityState]),
        SharedModule
    ],
    declarations: [TeamComponent]
})
export class TeamModule { }
