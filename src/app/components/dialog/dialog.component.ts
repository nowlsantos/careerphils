import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
    isConfirm = false;
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.init();
    }

    init() {
        const confirm = this.data.confirm.toUpperCase();
        if ( confirm === 'YES' ) {
            this.isConfirm = true;
        }
    }
}
