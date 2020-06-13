import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UploadDocumentComponent } from './upload-document/upload-document.component';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            {
                path: '', redirectTo: 'user',
                pathMatch: 'full'
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
