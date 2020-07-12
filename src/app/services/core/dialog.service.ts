import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@components/dialog/dialog.component';
import { BehaviorSubject, Observable, of } from 'rxjs';
import * as data from '../../../assets/data/dialog.json';

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

    openDialog(sender: string) {
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
}
