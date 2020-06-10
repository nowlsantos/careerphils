import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent,
         StoryComponent,
         MissionComponent,
         PeopleComponent,
         LocationComponent,
         FooterComponent } from './index';

const routes: Routes = [
    {
        path: '', component: HomeComponent,
        children: [
            { path: 'story', component: StoryComponent },
            { path: 'mission', component: MissionComponent },
            { path: 'people', component: PeopleComponent },
            { path: 'location', component: LocationComponent },
            { path: 'footer', component: FooterComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
