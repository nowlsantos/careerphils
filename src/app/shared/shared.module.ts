import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuicklinkModule } from 'ngx-quicklink';
// import { MaterialModule } from './material.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        QuicklinkModule
        // MaterialModule
    ],
    exports: [
        CommonModule,
        QuicklinkModule
        // MaterialModule,
    ]
})
export class SharedModule { }
