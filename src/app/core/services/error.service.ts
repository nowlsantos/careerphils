import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private messageSubject$ = new BehaviorSubject<string>('');
    message$ = this.messageSubject$.asObservable();

    setMessage(message: string) {
        this.messageSubject$.next(message);
    }
}
