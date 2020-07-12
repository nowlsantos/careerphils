import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '@models/message.model';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    // tslint:disable:variable-name
    private _messageSource$ = new BehaviorSubject<Message>(null);
    message$ = this._messageSource$.asObservable();

    constructor() { }

    sendMessage(value: Message) {
        this._messageSource$.next(value);
    }
}
