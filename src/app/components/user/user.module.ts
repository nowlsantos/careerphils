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

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UploadComponent } from './upload/upload.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateEditComponent } from './create-edit/create-edit.component';
import { DocumentComponent } from './document/document.component';

@NgModule({
    declarations: [
        UserComponent,
        ChangePasswordComponent,
        UploadComponent,
        ProfileComponent,
        CreateEditComponent,
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
        UserRoutingModule
    ]
})
export class UserModule { }
