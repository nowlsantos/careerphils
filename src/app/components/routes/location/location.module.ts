import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';


@NgModule({
    declarations: [LocationComponent],
    imports: [
        CommonModule,
        GoogleMapsModule,
        LocationRoutingModule
    ]
})
export class LocationModule { }
