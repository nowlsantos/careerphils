import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { AuthGuard } from '@services/guards';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        loadChildren: () => import('@components/routes/home/home.module').then( m => m.HomeModule ),
        data: {
            preload: true,
            state: 'home'
        }
    },
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
        path: 'auth',
        loadChildren: () => import('@components/auth/auth.module').then( m => m.AuthModule ),
        data: {
            preload: true,
            state: 'auth'
        }
    },
    {
        path: 'users/:id',
        loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
        canActivate: [ AuthGuard ],
        data: {
            preload: true,
            state: 'users'
        }
    },
    {
        path: 'admin',
        loadChildren: () => import('@components/admin/admin.module').then( m => m.AdminModule ),
        canLoad: [ AuthGuard ],
        data: {
            preload: true,
            state: 'admin'
        }
    },
    // otherwise redirect to home
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
            preloadingStrategy: QuicklinkStrategy,
            onSameUrlNavigation: 'reload'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
