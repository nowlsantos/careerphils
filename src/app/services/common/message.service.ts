import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '@models/message.model';

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    private messageSource$ = new BehaviorSubject<Message>(null);
    message$ = this.messageSource$.asObservable();

    constructor() { }

    sendMessage(value: Message) {
        this.messageSource$.next(value);
    }
}
