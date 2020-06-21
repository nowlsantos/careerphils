import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { MessageService } from '@services/message.service';
import { SubSink } from 'subsink';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
    private hposition: MatSnackBarHorizontalPosition = 'center';
    private vposition: MatSnackBarVerticalPosition = 'top';
    private subs = new SubSink();

    constructor(private messageService: MessageService,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.subs.add(
            this.messageService.message$.subscribe(result => {
                if ( result ) {
                    this.openSnackbar(result.message, null, result.error);
                }
            })
        );
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

    openSnackbar(message: string, action: string, error: boolean) {
        this.snackBar.open(message, action, {
            duration: 2000,
            horizontalPosition: this.hposition,
            verticalPosition: this.vposition,
            panelClass: [error ? 'snackbar-red-bg' : 'snackbar-green-bg']
        });
        // .afterDismissed()
        // .subscribe( (_) => {
        //     console.log('Snackbar dismissed');
        // });
    }
}
