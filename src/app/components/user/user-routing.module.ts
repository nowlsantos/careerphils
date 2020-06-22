import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent,
         ProfileComponent,
         ChangePasswordComponent,
         DocumentComponent } from './index';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            { path: 'profile', component: ProfileComponent },
            { path: 'password', component: ChangePasswordComponent },
            { path: 'document', component: DocumentComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
