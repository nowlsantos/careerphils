import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanLoad } from '@angular/router';
import { AuthService } from '@services/core/auth.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

    constructor(private router: Router,
                private authService: AuthService) {}

    canLoad(): Observable<boolean> | Promise<boolean> | boolean {
        return  this.authService.checkPermissions();
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.checkedLoggedIn(state.url);
    }

    checkedLoggedIn(url: string) {
        if ( this.authService.isLoggedIn() ) {
            return true;
        }
        this.authService.redirectUrl = url;
        this.router.navigate(['/login']);
        return false;
    }
}
