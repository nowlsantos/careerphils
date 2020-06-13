import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('@components/routes/home/home.module').then( m => m.HomeModule ),
        data: {
            preload: true,
            state: 'home'
        }
    },
    { path: 'admin', loadChildren: () => import('@components/admin/admin.module').then( m => m.AdminModule ) },
    {
        path: 'story',
        loadChildren: () => import('@components/routes/story/story.module').then(m => m.StoryModule),
        data: {
            preload: true,
            state: 'story'
        }
    },
    {
        path: 'mission',
        loadChildren: () => import('@components/routes/mission/mission.module').then(m => m.MissionModule),
        data: {
            preload: true,
            state: 'mission'
        }
    },
    {
        path: 'people',
        loadChildren: () => import('@components/routes/people/people.module').then(m => m.PeopleModule),
        data: {
            preload: true,
            state: 'people'
        }
    },
    {
        path: 'location',
        loadChildren: () => import('@components/routes/location/location.module').then(m => m.LocationModule),
        data: {
            preload: true,
            state: 'location'
        }
    },
    {
        path: 'user',
        loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
        data: {
            preload: true,
            state: 'user'
        }
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
