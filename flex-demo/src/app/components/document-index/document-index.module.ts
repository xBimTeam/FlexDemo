import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxsModule } from '@ngxs/store';
import { SharedModule } from '../../shared/shared.module';
import { DocumentIndexComponent } from './document-index.component';
import { DocumentIndexState } from './document-state';


const routes: Routes = [
    {
        path: '',
        component: DocumentIndexComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        NgxsModule.forFeature([DocumentIndexState]),
        SharedModule
    ],
    declarations: [DocumentIndexComponent]
})
export class DocumentIndexModule { }
