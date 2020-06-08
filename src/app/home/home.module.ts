import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


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
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class HomeModule { }
