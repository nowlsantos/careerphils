import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';

import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent,
         UserComponent,
         DashboardComponent,
         UserDetailComponent } from './index';

@NgModule({
    declarations: [
        AdminComponent,
        DashboardComponent,
        UserComponent,
        UserDetailComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatPaginatorModule,
        MatDialogModule,
        AdminRoutingModule,
    ]
})
export class AdminModule { }
