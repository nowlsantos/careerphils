import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent, DashboardComponent } from './index';
import { DashboardResolver, ProfileResolver } from '@services/resolvers/index';

const routes: Routes = [
    {
        path: '', component: AdminComponent,
        children: [
            {
                path: '', component: DashboardComponent,
                resolve: {
                    users: DashboardResolver
                },
                runGuardsAndResolvers: 'always'
            },
            {
                path: 'profiles', component: DashboardComponent,
                resolve: {
                    profiles: ProfileResolver
                },
                runGuardsAndResolvers: 'always'
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
