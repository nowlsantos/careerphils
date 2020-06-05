import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    {
        path: '',
        component: RegisterComponent,
        data: { state: 'register' }
    }
];

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class RegisterModule { }
