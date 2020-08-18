import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { FlexGridModule } from '@xbim/grid';

@NgModule({
  imports: [
    CommonModule,


    // Navigation
    MatMenuModule, MatSidenavModule, MatToolbarModule,

    // FormControls
    MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, MatInputModule,
    MatFormFieldModule, MatRadioModule, MatSelectModule, MatSliderModule,
    MatSlideToggleModule, MatSelectModule,
    // Layout
    MatCardModule, MatDividerModule, MatExpansionModule, MatGridListModule,
    MatListModule, MatStepperModule, MatTabsModule, MatTreeModule,
    // Buttons
    MatButtonModule, MatButtonToggleModule, MatBadgeModule, MatChipsModule,
    MatIconModule, MatProgressSpinnerModule, MatProgressBarModule, MatRippleModule,

    // Popups & Modals
    MatBottomSheetModule, MatDialogModule, MatSnackBarModule, MatTooltipModule,

    // Datatable
    MatTableModule, MatSortModule, MatPaginatorModule,

    FlexGridModule
  ],
  exports: [
    // CommonModule,

    // // Navigation
    // MatMenuModule, MatSidenavModule, MatToolbarModule,

    // // FormControls
    // MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule, 
    MatInputModule,
    MatFormFieldModule, // MatRadioModule, MatSelectModule, MatSliderModule,
    // MatSlideToggleModule, MatSelectModule,
    // // Layout
    MatCardModule,
    MatDividerModule,
    // MatExpansionModule, MatGridListModule,
    // MatListModule, MatStepperModule, MatTabsModule, MatTreeModule,
    // Buttons
    MatButtonModule,
    // MatButtonToggleModule,
    MatBadgeModule, MatChipsModule,
    //
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule, MatRippleModule,

    // Popups & Modals
    // MatBottomSheetModule, MatDialogModule, MatSnackBarModule, 
    MatTooltipModule,

    // Datatable
    MatTableModule, MatSortModule, MatPaginatorModule,

    FlexGridModule

  ],
  declarations: []
})
export class SharedModule { }
