import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '@models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {

    private userSource$ = new BehaviorSubject<User>(null);
    user$ = this.userSource$.asObservable();
    private user: User;

    constructor() { }

    broadcastUser(user: User) {
        this.user = user;
        this.userSource$.next(user);
    }

    getUser() {
        return this.user;
    }
}