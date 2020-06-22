import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '@models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

    private userSource$ = new BehaviorSubject<User>(null);
    user$ = this.userSource$.asObservable();

    constructor() { }

    broadcastUser(user: User) {
        this.userSource$.next(user);
    }
}