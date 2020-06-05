import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { AdminComponent } from './admin.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    declarations: [
        AdminComponent,
        RegisterComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        AdminRoutingModule,
    ]
})
export class AdminModule { }
