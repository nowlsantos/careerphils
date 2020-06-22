import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    private toastSource$ = new BehaviorSubject<string>(null);
    toast$ = this.toastSource$.asObservable();

    constructor() { }

    broadcastToast(sender: string) {
        this.toastSource$.next(sender);
    }
}
