import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        data: { state: 'home' }
    }
];

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class HomeModule { }
