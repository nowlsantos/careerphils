import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // tslint:disable:variable-name
    private _storageKey = 'cp-jwt';
    redirectUrl: string;

    setToken(token: string) {
        localStorage.setItem(this._storageKey, token);
    }

    getToken() {
        return localStorage.getItem(this._storageKey);
    }

    isLoggedIn() {
        return !!this.getToken();
    }

    logout() {
        localStorage.removeItem(this._storageKey);
    }

    checkPermissions() {
        const role = localStorage.getItem('role');
        return of(role === 'admin');
    }
}
