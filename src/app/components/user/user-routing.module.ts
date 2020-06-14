import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent,
         ProfileComponent,
         ChangePasswordComponent,
         UploadDocumentComponent } from './index';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            {
                path: '', redirectTo: 'profile',
                pathMatch: 'full'
            },
            {
                path: 'profile',
                component: ProfileComponent
            },
            {
                path: 'change-password',
                component: ChangePasswordComponent
            },
            {
                path: 'upload-document',
                component: UploadDocumentComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
