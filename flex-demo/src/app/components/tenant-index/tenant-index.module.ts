import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TenantIndexComponent } from './tenant-index.component';



const routes: Routes = [
    {
        path: '',
        component: TenantIndexComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        // NgxsModule.forFeature([TenantEntityState]),
        SharedModule
    ],
    exports: [
        TenantIndexComponent
    ],
    declarations: [TenantIndexComponent]
})
export class TenantIndexModule { }
