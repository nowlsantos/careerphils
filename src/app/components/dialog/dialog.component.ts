import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
    confirmation = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.init();
    }

    init() {
        // console.log('DATA::', this.data.confirm );
        if ( this.data.confirm.toUpperCase() === 'YES' ) {
            this.confirmation = true;
        }
    }
}
