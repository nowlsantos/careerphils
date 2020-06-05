import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuicklinkStrategy } from 'ngx-quicklink';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home', component: HomeComponent,
        loadChildren: () => import('./home/home.module').then( m => m.HomeModule ),
        data: {
            preload: true,
            state: 'home'
        }
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then( m => m.AdminModule ),
    },
    /* {
        path: 'register',
        loadChildren: () => import('./admin/register.module').then( m => m.RegisterModule ),
        data: {
            preload: true,
            state: 'register'
        }
    },
    {
        path: 'login',
        loadChildren: () => import('./admin/login.module').then( m => m.LoginModule ),
        data: {
            preload: true,
            state: 'login'
        }
    }, */
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { preloadingStrategy: QuicklinkStrategy})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
