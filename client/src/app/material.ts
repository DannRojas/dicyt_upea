import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';;
import { MatMomentDateModule } from '@angular/material-moment-adapter';;

import { NgModule } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatMenuModule,
        MatCardModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatMomentDateModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatSidenavModule,
        MatToolbarModule,
        MatListModule,
        MatMenuModule,
        MatCardModule,
        MatProgressBarModule,
        MatDatepickerModule,
        MatMomentDateModule
    ]
})
export class MaterialModule{}