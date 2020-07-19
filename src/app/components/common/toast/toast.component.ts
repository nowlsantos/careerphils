import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MessageService, ToasterService } from '@services/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

enum Sender {
    Register = 'REGISTER',
    Login = 'LOGIN',
    Profile = 'PROFILE',
    ChangePassword = 'CHANGE_PASSWORD',
    FileService = 'FILE_SERVICE',
    AdminGuard = 'ADMIN_GUARD'
}

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
    // tslint:disable:variable-name
    private _hposition: MatSnackBarHorizontalPosition = 'center';
    private _vposition: MatSnackBarVerticalPosition = 'top';
    private _subscription = new Subscription();
    private _sender: string;

    constructor(private router: Router,
                private messageService: MessageService,
                private toastService: ToasterService,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
        this._subscription.add(
            this.messageService.message$.subscribe(result => {
                if ( result ) {
                    this._sender = result.sender;
                    this.openSnackbar(result.message, null, result.duration, result.error);
                }
            })
        );
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }

    openSnackbar(message: string, action: string, duration: number = 2000, error: boolean) {
        this.snackBar.open(message, action, {
            duration,
            horizontalPosition: this._hposition,
            verticalPosition: this._vposition,
            panelClass: [error ? 'snackbar-red-bg' : 'snackbar-green-bg']
        })
        .afterDismissed()
        .subscribe( () => {
            // console.log('Snackbar dismissed');
            if ( !error ) {
                switch ( this._sender ) {
                    case Sender.Register:
                        this.toastService.broadcastToast(Sender.Register);
                        break;

                    case Sender.Login:
                        this.toastService.broadcastToast(Sender.Login);
                        break;

                    case Sender.Profile:
                        this.toastService.broadcastToast(Sender.Profile);
                        break;

                    case Sender.ChangePassword:
                        this.toastService.broadcastToast(Sender.ChangePassword);
                        break;

                    case Sender.AdminGuard:
                        this.toastService.broadcastToast(Sender.AdminGuard);
                        break;

                    case Sender.FileService:
                        this.toastService.broadcastToast(Sender.FileService);
                        break;
                }
            } else {
                if ( this._sender === 'ERROR' ) {
                    this._sender = null;
                }
            }
        });
    }
}
