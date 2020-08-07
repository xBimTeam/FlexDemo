import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { FacilityIndexComponent } from './facility-index.component';
import { FacilityIndexState } from './facility-state';



const routes: Routes = [
    {
        path: '',
        component: FacilityIndexComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([FacilityIndexState]),
        SharedModule
    ],
    declarations: [FacilityIndexComponent]
})
export class FacilityIndexModule { }
