import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { ApplicationIndexComponent } from './application-index.component';
import { ApplicationIndexState } from './application-state';




const routes: Routes = [
    {
        path: '',
        component: ApplicationIndexComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([ApplicationIndexState]),
        SharedModule
    ],
    declarations: [ApplicationIndexComponent]
})
export class ApplicationIndexModule { }
