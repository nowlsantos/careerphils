import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    // tslint:disable:variable-name
    private _registerSource$ = new BehaviorSubject<boolean>(false);
    register$ = this._registerSource$.asObservable();

    constructor() { }

    broadcastRegister(flag: boolean) {
        this._registerSource$.next(flag);
    }
}
