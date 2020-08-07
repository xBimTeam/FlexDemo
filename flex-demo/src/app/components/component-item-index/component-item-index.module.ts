import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { ComponentItemIndexComponent } from './component-item-index.component';
import { ComponentIndexState } from './component-state';


const routes: Routes = [
    {
        path: '',
        component: ComponentItemIndexComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([ComponentIndexState]),
        SharedModule
    ],
    declarations: [ComponentItemIndexComponent]
})
export class ComponentItemIndexModule { }
