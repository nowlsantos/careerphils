import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent,
         ProfileComponent,
         ChangePasswordComponent,
         DocumentComponent } from './index';

import { ProfileGuard, DocumentGuard } from '@services/guards/';
import { UserResolver } from '@services/resolvers';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        canActivateChild: [ DocumentGuard ],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {
                path: 'dashboard', component: UserDashboardComponent
            },
            {
                path: 'profile', component: ProfileComponent,
                canDeactivate: [ ProfileGuard ]
            },
            {
                path: 'password', component: ChangePasswordComponent,
                canDeactivate: [ ProfileGuard ]
            },
            { path: 'document', component: DocumentComponent }
        ],
        resolve: {
            user: UserResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
