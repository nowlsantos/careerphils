import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent,
         ProfileComponent,
         ChangePasswordComponent,
         DocumentComponent } from './index';

import { ProfileGuard, DocumentGuard } from '@services/guards/';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        canActivateChild: [ DocumentGuard ],
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full' },
            {
                path: 'profile', component: ProfileComponent,
                canDeactivate: [ ProfileGuard ]
            },
            {
                path: 'password', component: ChangePasswordComponent,
                canDeactivate: [ ProfileGuard ]
            },
            { path: 'document', component: DocumentComponent }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
