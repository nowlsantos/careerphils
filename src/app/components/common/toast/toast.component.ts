import { Component, OnInit, OnDestroy } from '@angular/core';
import {
    MatSnackBar,
    MatSnackBarHorizontalPosition,
    MatSnackBarVerticalPosition
} from '@angular/material/snack-bar';
import { MessageService, ToasterService } from '@services/common/index';
import { SubSink } from 'subsink';

enum Sender {
    Register = 'REGISTER',
    Login = 'LOGIN',
    Profile = 'PROFILE',
}

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
    private hposition: MatSnackBarHorizontalPosition = 'center';
    private vposition: MatSnackBarVerticalPosition = 'top';
    private subs = new SubSink();
    private sender: string;

    constructor(private messageService: MessageService,
                private toastService: ToasterService,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.subs.add(
            this.messageService.message$.subscribe(result => {
                if ( result ) {
                    this.sender = result.sender;
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
        })
        .afterDismissed()
        .subscribe( () => {
            // console.log('Snackbar dismissed');
            if ( !error ) {
                switch ( this.sender ) {
                    case Sender.Register:
                        this.toastService.broadcastToast(Sender.Register);
                        break;

                    case Sender.Login:
                        this.toastService.broadcastToast(Sender.Login);
                        break;

                    case Sender.Profile:
                        this.toastService.broadcastToast(Sender.Profile);
                        break;
                }
            } else {
                this.sender = null;
            }
        });
    }
}
