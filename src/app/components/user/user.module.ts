import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent,
         ProfileComponent,
         ChangePasswordComponent,
         DocumentComponent} from './index';

@NgModule({
    declarations: [
        UserComponent,
        ProfileComponent,
        ChangePasswordComponent,
        DocumentComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRippleModule,
        MatRadioModule,
        MatDividerModule,
        MatListModule,
        MatSelectModule,
        UserRoutingModule
    ]
})
export class UserModule {}
