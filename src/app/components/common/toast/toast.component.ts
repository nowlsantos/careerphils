import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MessageService, ToasterService } from '@services/core';
import { Subscription } from 'rxjs';

enum Sender {
    Register = 'REGISTER',
    Login = 'LOGIN',
    Profile = 'PROFILE',
    ChangePassword = 'CHANGE_PASSWORD',
    FileService = 'FILE_SERVICE',
    Document = 'DOCUMENT'
}

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit, OnDestroy {
    private hposition: MatSnackBarHorizontalPosition = 'center';
    private vposition: MatSnackBarVerticalPosition = 'top';
    private subscription = new Subscription();
    private sender: string;

    constructor(private messageService: MessageService,
                private toastService: ToasterService,
                private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.subscription.add(
            this.messageService.message$.subscribe(result => {
                if ( result ) {
                    this.sender = result.sender;
                    this.openSnackbar(result.message, null, result.duration, result.error);
                }
            })
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    openSnackbar(message: string, action: string, duration: number = 2000, error: boolean) {
        this.snackBar.open(message, action, {
            duration,
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

                    case Sender.ChangePassword:
                        this.toastService.broadcastToast(Sender.ChangePassword);
                        break;

                    case Sender.Document:
                        this.toastService.broadcastToast(Sender.Document);
                        break;

                    case Sender.FileService:
                        this.toastService.broadcastToast(Sender.FileService);
                        break;
                }
            } else {
                this.sender = null;
            }
        });
    }
}
