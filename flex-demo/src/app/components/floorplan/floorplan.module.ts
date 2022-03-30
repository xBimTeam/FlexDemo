import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FloorplanComponent } from './floorplan.component';



@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [FloorplanComponent], 
    exports: [FloorplanComponent]
})
export class FloorplanModule { }
