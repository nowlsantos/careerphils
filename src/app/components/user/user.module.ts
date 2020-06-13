import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';

@NgModule({
    declarations: [
        UserComponent,
        ChangePasswordComponent,
        UploadDocumentComponent
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
        UserRoutingModule
    ]
})
export class UserModule { }
