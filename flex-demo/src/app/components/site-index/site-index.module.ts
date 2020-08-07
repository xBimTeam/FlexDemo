import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { SiteIndexComponent } from './site-index.component';
import { SiteIndexState } from './site-state';

const routes: Routes = [
    {
        path: '',
        component: SiteIndexComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([SiteIndexState]),
        SharedModule
    ],
    declarations: [SiteIndexComponent]
})
export class SiteIndexModule { }
