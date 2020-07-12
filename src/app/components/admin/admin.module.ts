import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent, DashboardComponent } from './index';
import { UserComponent } from './user/user.component';

@NgModule({
    declarations: [
        AdminComponent,
        DashboardComponent,
        UserComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        MatDividerModule,
        MatSelectModule,
        AdminRoutingModule,
    ]
})
export class AdminModule { }
