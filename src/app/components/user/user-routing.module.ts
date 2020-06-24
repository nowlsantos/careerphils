import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent,
         UserDashboardComponent,
         ProfileComponent,
         ChangePasswordComponent,
         DocumentComponent } from './index';
import { ProfileResolver } from '@services/resolvers/profile.resolver';

const routes: Routes = [
    {
        path: '', component: UserComponent,
        children: [
            { path: 'dashboard', component: UserDashboardComponent },
            {
                path: 'profile', component: ProfileComponent,
                resolve: { profile: ProfileResolver }
            },
            { path: 'password', component: ChangePasswordComponent },
            { path: 'document', component: DocumentComponent },
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
