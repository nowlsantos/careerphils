import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    // tslint:disable:variable-name
    private _toastSource$ = new BehaviorSubject<string>(null);
    toast$ = this._toastSource$.asObservable();

    constructor() { }

    broadcastToast(sender: string) {
        this._toastSource$.next(sender);
    }
}
