import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    private storageKey = 'cp-jwt';

    setToken(token: string) {
        localStorage.setItem(this.storageKey, token);
    }

    getToken() {
        return localStorage.getItem(this.storageKey);
    }

    isLoggedIn() {
        return !!this.getToken();
    }

    logout() {
        localStorage.removeItem(this.storageKey);
    }
}
