import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { TenantIndexComponent } from './tenant-index.component';
import { FormsModule } from '@angular/forms';



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
        FormsModule,
        SharedModule
    ],
    exports: [
        TenantIndexComponent
    ],
    declarations: [TenantIndexComponent]
})
export class TenantIndexModule { }
