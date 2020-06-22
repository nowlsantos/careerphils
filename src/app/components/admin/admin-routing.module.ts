import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent, RegisterComponent, LoginComponent } from './index';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: AdminComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'login', component: LoginComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
