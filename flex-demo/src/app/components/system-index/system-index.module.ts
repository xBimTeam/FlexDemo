import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { SystemIndexComponent } from './system-index.component';
import { SystemIndexState } from './system-state';




const routes: Routes = [
    {
        path: '',
        component: SystemIndexComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([SystemIndexState]),
        SharedModule
    ],
    declarations: [SystemIndexComponent]
})
export class SystemIndexModule { }
