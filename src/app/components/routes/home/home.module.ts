import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { HomeRoutingModule } from './home.routing.module';
import { HomeComponent } from './home.component';
import { FooterComponent } from '@components/common/footer/footer.component';

@NgModule({
    declarations: [
        HomeComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        HomeRoutingModule
    ]
})
export class HomeModule { }
