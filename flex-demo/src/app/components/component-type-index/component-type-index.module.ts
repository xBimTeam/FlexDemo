import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { ComponentTypeIndexComponent } from './component-type-index.component';
import { ComponentTypeIndexState } from './component-type-state';


const routes: Routes = [
    {
        path: '',
        component: ComponentTypeIndexComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([ComponentTypeIndexState]),
        SharedModule
    ],
    declarations: [ComponentTypeIndexComponent]
})
export class ComponentTypeIndexModule { }
