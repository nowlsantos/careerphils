import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '@models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    // tslint:disable:variable-name
    private _userSource$ = new BehaviorSubject<User>(null);
    private _user: User;
    user$ = this._userSource$.asObservable();

    broadcastUser(user: User) {
        this._user = user;
        this._userSource$.next(user);
    }

    getUser() {
        return this._user;
    }

    setRole(role: string) {
        localStorage.setItem('role', role);
    }

    getRole() {
        return localStorage.getItem('role');
    }

    removeRole() {
        localStorage.removeItem('role');
    }
}
