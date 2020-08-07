import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { InvitationEntityState } from '@xbim/features/team/shared';
import { SharedModule } from '../../shared/shared.module';
import { InvitationsComponent } from './invitations.component';



const routes: Routes = [
    {
        path: '',
        component: InvitationsComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([InvitationEntityState]),
        SharedModule
    ],
    declarations: [InvitationsComponent]
})
export class InvitationsModule { }
