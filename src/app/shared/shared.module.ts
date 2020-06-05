import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { QuicklinkModule } from 'ngx-quicklink';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        QuicklinkModule
    ]
})
export class SharedModule { }