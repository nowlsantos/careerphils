import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { ErrorService } from '@services/error.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
    hposition: MatSnackBarHorizontalPosition = 'center';
    vposition: MatSnackBarVerticalPosition = 'top';

    private subs = new SubSink();

    constructor(private errorService: ErrorService,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.subs.add(
            this.errorService.message$.subscribe(message => {
                if ( message ) {
                    this.openSnackbar(message);
                    // console.log('APP ERROR::', message);
                }
            })
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    openSnackbar(message: string) {
        this.snackBar.open(message, '', {
            duration: 3000,
            horizontalPosition: this.hposition,
            verticalPosition: this.vposition
        });
    }
}
