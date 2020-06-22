import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    private registerSource$ = new BehaviorSubject<boolean>(false);
    register$ = this.registerSource$.asObservable();

    constructor() { }

    broadcastRegister(flag: boolean) {
        this.registerSource$.next(flag);
    }
}
