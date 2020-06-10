import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HomeRoutingModule } from './home.routing.module';

import { HomeComponent,
         StoryComponent,
         MissionComponent,
         PeopleComponent,
         LocationComponent,
         FooterComponent,
         CardComponent } from './index';

@NgModule({
    declarations: [
        HomeComponent,
        StoryComponent,
        MissionComponent,
        PeopleComponent,
        LocationComponent,
        FooterComponent,
        CardComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
