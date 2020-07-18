import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@components/dialog/dialog.component';
import { BehaviorSubject, Observable } from 'rxjs';
import * as data from '../../../assets/data/dialog.json';
import { User } from '@models/user.model';
import { UserDetailComponent } from '@components/admin/user-detail/user-detail.component';

@Injectable({
    providedIn: 'root'
})
export class DialogService {
    // tslint:disable:variable-name
    private _dialogSource$ = new BehaviorSubject<Observable<boolean>>(null);
    dialog$ = this._dialogSource$.asObservable();

    constructor(public dialog: MatDialog) {}

    broadCast(value: Observable<boolean>) {
        this._dialogSource$.next(value);
    }

    openGuardDialog(sender: string) {
        const dialogData = (data as any).default;
        let options = {};

        switch ( sender.toUpperCase() ) {
            case 'DOCUMENT':
                options = {
                    title: dialogData.Document.title,
                    content: dialogData.Document.content,
                    confirm: dialogData.Document.confirm
                };
                break;

            case 'PROFILE':
                options = {
                    title: dialogData.Profile.title,
                    content: dialogData.Profile.content,
                    confirm: dialogData.Profile.confirm
                };
                break;
        }

        return this.dialog.open(DialogComponent, { data: options })
                          .afterClosed() as Observable<boolean>;
    }

    openUserDialog(user: User) {
        this.dialog.open(UserDetailComponent, { data: user });
    }
}
